import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { styles } from './BottomSheetDefaultStyles'
import { TouchableOpacity } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { app_c } from 'globals/styles'


const BottomSheetDefault = ({ snapPoints, label, childrenView}) => {

  const bottomSheetRef = useRef(null)
  const [date, setDate] = useState(new Date())
  const handleCloseBottomSheet = useCallback(() => {
  
    bottomSheetRef.current?.close()
    
    const timeToClose = setTimeout(() => {
      // Phuong: call action to update state
      dispatch(updateCurrentManifold({
        ...currentManifold,
        appearNotificationBottomSheet: false
      }))
      clearInterval(timeToClose)
    }, 300)
  }, [])

  return (
    <>
      <Pressable 
        style={styles.modal} 
        onPress={handleCloseBottomSheet}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={handleCloseBottomSheet}
        backgroundStyle={styles.bottomSheetContainer}
      >
        <BottomSheetView
          style={styles.bottomView}
        >
          <Text style={styles.textHeader}>{label}</Text>
          <RNDateTimePicker
            value={date}
            display="spinner"
            // onChange={(e, date) => handleDateChange(e, date)}
            textColor={app_c.HEX.fourth}
          />
          {childrenView}
          <TouchableOpacity
            style={styles.btn}
            onPress={handleCloseBottomSheet}
          >
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

export default BottomSheetDefault