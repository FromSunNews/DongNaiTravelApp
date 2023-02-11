import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { styles } from './BottomSheetScrollStyles'
import { termsConditions } from 'utilities/termsConditions'
import Icon from 'react-native-vector-icons/Octicons'
import { app_c } from 'globals/styles'


const BottomSheetScroll = ({ openTermCondition, closeTermCondition, childView, snapPoints, labelBtn }) => {

  const bottomSheetRef = useRef(null)

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
    
    closeTermCondition()
    
  }, [])
  if (openTermCondition)
    return (
      <>
        <Pressable 
          style={styles.modal} 
          onPress={handleClosePress}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={handleClosePress}
          backgroundStyle={styles.bottomSheetContainer}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomView}
          >

            {childView}

            <TouchableOpacity
              style={styles.btn}
              onPress={handleClosePress}
            >
            <Text style={styles.btnText}>{labelBtn}</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      </> 
    )
}

export default BottomSheetScroll