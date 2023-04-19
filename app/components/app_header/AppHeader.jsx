import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './AppHeaderStyles'
import AppText from '../app_text/AppText';
import CircleButton from '../buttons/CircleButton';

import { app_c, app_shdw } from 'globals/styles';
import { color } from 'react-native-reanimated';
import { app_typo } from '../../globals/styles';
import { useSelector } from 'react-redux';
import { selectCurrentNotifs } from '../../redux/notifications/NotificationsSlice';

 /**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây sẽ là phần header của screen, mỗi screen sẽ có một header khác nhau, tuy nhiên thì cấu trúc cơ bản của nó là giống nhau.
 * Header sẽ được chia làm 3 phần, phần trái, giữa và phải. Header mặc định sẽ có một nút để back và một nút tìm kiếm.
 * @param {object} props - Props của component.
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {string} props.screenName - Tên của screen.
 * @param {6 | 8 | 10 | 12 | 16 | 18 | 22} [props.marginBottom=12] - Tuỳ chỉnh margin bottom cho Header, bởi vì header sẽ cách các container dưới 1 khoảng.
 * @param {object} props.back - Dùng cho nút back.
 * @param {string} props.back.title - Header có background hay không?
 * @param {object} props.navigation - Object navigation.
 * @param {object} props.route - Thông tin về Route.
 * @param {object} props.options - [Override NativeStackNavigationOptions] Options của screen.
 * @param {boolean} props.options.headerTransparent - [Override Property] Thông số chỉnh transparent cho header's background.
 * @param {string} props.options.title - [Override Property] Thông số chỉnh title cho header's background.
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} props.options.boxShadowType - [Override Property] Thông số chỉnh boxShadow cho header's background.
 * @param {() => JSX.Element} props.setLeftPart - Function cho phép custom phần bên trái của Header.
 * @param {() => JSX.Element} props.setCenterPart - Function cho phép custom phần giữa của Header.
 * @param {() => JSX.Element} props.setRightPart - Function cho phép custom phần phải trái của Header.
 * @returns `View` component với styles
 */
const AppHeader = ({
  boxShadowType,
  screenName,
  marginBottom,
  back,
  navigation,
  route,
  options,
  setLeftPart,
  setCenterPart,
  setRightPart
}) => {

  const currentNotif = useSelector(selectCurrentNotifs)
  const [numberOfVisited, setNumberOfVisited] = useState(0)

  const canSetLeftPart = typeof setLeftPart === 'function';
  const canSetCenterPart = typeof setCenterPart === 'function';
  const canSetRightPart = typeof setRightPart === 'function';
  const canSetBackButton = navigation.canGoBack() && !options.isTopScreen;
  const title = (
    options.title !== "" && options.title
    ? options.title
    : screenName !== "" && screenName
    ? screenName
    : route.name
  )
  const transparent = options.headerTransparent;
  const boxShadow = (
    options.boxShadowType !== "" && options.boxShadowType
    ? options.boxShadowType
    : boxShadowType !== "" && boxShadowType
    ? boxShadowType
    : ""
  )
  const headerStyle = {
    ...styles.container,
    ...app_shdw[boxShadow],
    ...(transparent ?  { backgroundColor: `rgba(${app_c.RGB.primary}, 0)` } : {} )
  }


  useEffect(() => {
    if (currentNotif.length > 0) {
      setNumberOfVisited(currentNotif.filter(notif => notif._isVisited === false).length)
    }
  }, [currentNotif])

  return (
    <View style={headerStyle}>
      {/* Phần bên trái */}
      {canSetLeftPart
        ? setLeftPart()
        : (
          <View style={{...styles.header_col, justifyContent: 'flex-start', alignItems: 'center'}}>
            {
              canSetBackButton
              && (
                <CircleButton
                  defaultColor="type_2"
                  boxShadowType="type_1"
                  typeOfButton="opacity"
                  onPress={() => navigation.goBack()}
                  setIcon={(isActive, currentLabelStyle) => (
                    <Ionicons name="chevron-back-outline" size={18} style={currentLabelStyle} />
                  )}
                />
              )
            }
          </View>
        )
      }

      {/* Phần ở giữa */}
      {canSetCenterPart
        ? setCenterPart()
        : (
          <View style={{...styles.header_col, justifyContent: 'center', alignItems: 'center'}}>
            <AppText weight="lighter" font="h5" style={{textAlign: 'center'}}>{title}</AppText>
          </View>
        )
      }

      {/* Phần bên phải */}
      {canSetRightPart
        ? setRightPart()
        : (
          <View style={{...styles.header_col, justifyContent: 'flex-end', alignItems: 'center'}}>
            <CircleButton
              defaultColor="type_2"
              boxShadowType="type_1"
              typeOfButton="opacity"
              setIcon={(isActive, currentLabelStyle) => (
                <Ionicons name="search-outline" size={18} style={currentLabelStyle} />
              )}
            />
            
            {
              title==='Home' && (
                <View style={{paddingLeft:10}}>
                  <CircleButton
                    defaultColor="type_2"
                    boxShadowType="type_1"
                    typeOfButton="opacity"
                    onPress={() => navigation.navigate('Notification')}
                    setIcon={(isActive, currentLabelStyle) => (
                      <Ionicons name="notifications-sharp" size={18} style={[currentLabelStyle, {color: numberOfVisited !== 0 ? '#FFC72C' : null}]} />
                    )}
                  />

                  {
                    numberOfVisited > 0 &&
                    <View style={{
                      height: 15,
                      width: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#CE2029',
                      borderRadius: 7.5,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                    }}>
                      <Text style={{
                        color: app_c.HEX.primary,
                        ...app_typo.fonts.normal.bolder.body2,
                        fontSize: 10
                      }}>{numberOfVisited}</Text>
                    </View>
                  }

                </View>
              )
            }
          </View>
        )
      }
    </View>
  )
}

export default AppHeader