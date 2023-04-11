import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { styles } from './BottomSheetScrollStyles'
import { termsConditions } from 'utilities/termsConditions'
import Icon from 'react-native-vector-icons/Octicons'
import { app_c, app_typo } from 'globals/styles'


const BottomSheetScroll = ({ 
  openTermCondition = false,
  closeTermCondition,
  childView,
  snapPoints,
  labelBtn,
  handleLabelBtn,
  haveBtn = true,
  haveOverlay = true,
  bottomView,
  labelBtnStyle,
  haveHeader = false,
  childHeader,
}) => {

  const bottomSheetRef = useRef(null)

  const handleClosePress = () => {
    closeTermCondition()
    bottomSheetRef.current?.close()
  }

  if (openTermCondition)
    return (
      <>
        {
          haveOverlay &&
          <Pressable 
            style={styles.modal} 
            onPress={handleClosePress}
          />
        }
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => closeTermCondition()}
          backgroundStyle={styles.bottomSheetContainer}
        >
          {
            haveHeader &&
            <BottomSheetView>
              {childHeader}
            </BottomSheetView>
          }

          <BottomSheetScrollView
            contentContainerStyle={[styles.bottomView, bottomView]}
            showsVerticalScrollIndicator={false}
          >
            {childView}
            {
              haveBtn && 
              <TouchableOpacity
                style={[styles.btn, labelBtnStyle]}
                onPress={handleLabelBtn}
              >
                <Text style={styles.btnText}>{labelBtn}</Text>
              </TouchableOpacity>
            }

          </BottomSheetScrollView>
        </BottomSheet>
      </> 
    )
}

export default BottomSheetScroll