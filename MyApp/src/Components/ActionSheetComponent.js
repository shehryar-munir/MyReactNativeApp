import React, { useRef, useState } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import {View, Text, TouchableOpacity, StyleSheet, Button, TouchableWithoutFeedback} from 'react-native'
import CommunityCheckBox from '@/Components/CheckBox'

const styles = StyleSheet.create({
  actionSheetStyle: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
})

// const data = [
//   { key: '1', value: 'Software Development', isSelected: false },
//   { key: '2', value: 'Data Science', isSelected: false },
//   { key: '3', value: 'Software Quality Assurance', isSelected: false },
//   { key: '4', value: 'Machine Learning', isSelected: false },
//   { key: '5', value: 'Business Analytics', isSelected: false },
// ]

const ActionSheetComponent = ({ fieldKey, handleChangeFunction, options }) => {
  const actionSheetRef = useRef(null)
  const [selectedCareers, setSelectedCareers] = useState([])

  const handleTouch = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const updateSelectedData = (item) => {
    console.log("key ", item)
    // console.log("selectedValue", selectedValue)
    // data.map(item => {
    //   if (item.key === key) {
    //     item.isSelected = selectedValue
    //   }
    // })
  }
  console.log("options data ", options)

  const closeModal = () => {
    handleChangeFunction(fieldKey, options)
    actionSheetRef.current?.setModalVisible(false)
  }

  return (
    <View>
      <TouchableOpacity onPress={handleTouch}>
        <Text>Add career preference</Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} gestureEnabled={true}
                   bounceOnOpen={false}
                   nestedScrollEnabled={true}>
        <View>
          {/*{options?.map(item => (*/}
          {/*  <CommunityCheckBox*/}
          {/*    updateSelectedData={updateSelectedData}*/}
          {/*    optionKey={item.key}*/}
          {/*    optionText={item.value}*/}
          {/*  />*/}
          {/*))}*/}
          {options?.map(item => (
              // <CommunityCheckBox
              //     updateSelectedData={updateSelectedData}
              //     optionKey={item.key}
              //     optionText={item.value}
              // />
              <View key={item?.id}>
              <TouchableWithoutFeedback onPress={()=>updateSelectedData(item)}>
                <View>
              <Text>
                {item?.value}
              </Text>
                </View>
              </TouchableWithoutFeedback>
              </View>
          ))}

          <View style={{ padding: 200 }} />
          <Button title={'Submit'} onPress={() => closeModal()} />
        </View>
      </ActionSheet>
    </View>
  )
}

export default ActionSheetComponent
