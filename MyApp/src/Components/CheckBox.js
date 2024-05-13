import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

const CommunityCheckBox = ({ updateSelectedData, optionKey, optionText }) => {
  const [checked, setChecked] = useState(false)

  const handleSelected = selectVal => {
    setChecked(selectVal)
    updateSelectedData(optionKey, selectVal)
  }
  return (
    <View style={styles.checkBoxViewStyle}>
      <CheckBox
        testID={optionKey}
        value={checked}
        onValueChange={val => handleSelected(val)}
      />
      <Text style={styles.checkBoxTextStyle}>{optionText}</Text>
    </View>
  )
}

export default CommunityCheckBox

const styles = StyleSheet.create({
  checkBoxViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  checkBoxTextStyle: {
    margin: 5,
  },
})
