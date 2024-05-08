import React, { useRef, useState } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list'

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

const data = [
  { key: '1', value: 'Software Development' },
  { key: '2', value: 'Data Science' },
  { key: '3', value: 'Software Quality Assurance' },
  { key: '4', value: 'Machine Learning' },
  { key: '5', value: 'Business Analytics' },
]

const ActionSheetComponent = ({ fieldKey, handleChangeFunction }) => {
  const actionSheetRef = useRef(null)
  const [selected, setSelected] = useState([])

  const handleTouch = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const closeModal = agreed => {
    handleChangeFunction(fieldKey, agreed)
    actionSheetRef.current?.setModalVisible(false)
  }

  return (
    <View>
      <TouchableOpacity onPress={handleTouch}>
        <Text>Add career preference</Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef}>
        <View>
          <MultipleSelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            label="Categories"
          />
          <View style={{ padding: 200 }} />
          <Button title={'Submit'} onPress={() => closeModal(true)} />
        </View>
      </ActionSheet>
    </View>
  )
}

export default ActionSheetComponent
