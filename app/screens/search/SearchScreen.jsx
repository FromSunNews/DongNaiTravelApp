import { View, SafeAreaView, Platform } from 'react-native'
import React from 'react'

import {
  getPlacesAPI
} from 'apis/axios'

import {
  createSearchWithResultList
} from 'hocs/createResultList'
import { withTheme } from 'hocs/withTheme'

import { useNavigation } from '@react-navigation/native'

import {
  usePlaceDetailsActions
} from 'customHooks/usePlace'

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'

import {
  RectangleButton,
  AppText,
  Search,
  SearchResultList,
  CircleButton
} from 'components'

import {
  app_sp,
  app_c
} from 'globals/styles'

import {
  SEARCH_PLACE_DATA_FIELDS,
  SEARCH_RESULT_TYPE
} from 'utilities/constants'

const MySearchWithResultList = createSearchWithResultList([
  async (text) => {
    let query = `limit=10&skip=0&filter=name:${text}&fields=${SEARCH_PLACE_DATA_FIELDS}`
    let data = await getPlacesAPI(query);
    // Nhớ thêm cái này, bởi vì khi search thì dữ liệu trả về sẽ không giống nhau.
    data._dataType = SEARCH_RESULT_TYPE.PLACES;
    return data;
  }
]);

const SearchScreen = withTheme(({
  navigation,
  route,
  theme
}) => {
  const [results, setResults] = React.useState([]);

  const { addPlaceDetails } = usePlaceDetailsActions();

  const apis = React.useMemo(() => {
    return [
      async (text) => {
        let query = `limit=10&skip=0&filter=name:${text}&fields=${SEARCH_PLACE_DATA_FIELDS}`
        let data = await getPlacesAPI(query);
        // Nhớ thêm cái này, bởi vì khi search thì dữ liệu trả về sẽ không giống nhau.
        // Chỉ cần thêm khi mà mục tiêu của mình là tìm kiếm nhiều dữ liệu.
        return data;
      }
    ]
  }, []);

  return (
    <>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        ...app_sp.pv_12,
        ...app_sp.ph_18,
      }}>
        <CircleButton
          defaultColor="type_4"
          typeOfButton="opacity"
          style={app_sp.me_12}
          onPress={() => navigation.goBack()}
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons name="chevron-back-outline" size={18} style={currentLabelStyle} />
          )}
        />
        <Search
          apis={apis}
          placeHolder='Search...'
          callBack={(searchString, data) => {
            if(!data) return;
            setResults(data);
          }}
        />
      </View>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={[app_sp.ph_18]}
        style={{backgroundColor: theme.background, flex: 1}}
      >
        <SearchResultList
          resultListPosition='normal'
          scrollEnabled={false}
          results={results}
          keyExtractor={item => {
            if(item._dataType === SEARCH_RESULT_TYPE.PLACE) return item.place_id;
          }}
          renderResultItem={item => {
            if(item._dataType === SEARCH_RESULT_TYPE.PLACE) {
              return (
                <RectangleButton
                  typeOfButton='opacity'
                  defaultColor='type_4'
                  onPress={() => {
                    addPlaceDetails(item);
                    navigation.push('PlaceDetailScreen', {
                      placeId: item.place_id,
                      fromSearch: true
                    });
                  }}
                  style={[{justifyContent: 'flex-start'}, app_sp.pv_18, app_sp.ph_0]}
                >
                  <Foundation name="mountains" color={theme.onBackground} size={18} style={[app_sp.me_12, app_sp.ph_12]} />
                  <AppText>{item.name}</AppText>
                </RectangleButton>
              )
            }
          }}
        />
      </KeyboardAwareScrollView>
    </>
  )
})

export default SearchScreen