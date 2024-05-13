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


const ActionSheetComponent = ({ fieldKey, handleChangeFunction, options }) => {
  const actionSheetRef = useRef(null)
  const [selectedCareers, setSelectedCareers] = useState([])

  const handleTouch = () => {
    actionSheetRef.current?.setModalVisible(true)
  }


  const updateSelectedData = (item) => {

    if (selectedCareers.includes(item.value)) {
      const careersCopy = [...selectedCareers]
      const filteredCareers = careersCopy.filter(career => career !== item.value)
      setSelectedCareers(filteredCareers)
    }
    else {
      setSelectedCareers([
        ...selectedCareers,
        item.value
      ])
    }
  }

  const closeModal = () => {

    handleChangeFunction(fieldKey, selectedCareers)
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

          {options?.map(item => (

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
