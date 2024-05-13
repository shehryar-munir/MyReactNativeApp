import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 1,
    width: 300,
    height: 40,
    padding: 10,
  },

  viewStyle: {
    margin: 10,
  },

  textStyle: {
    marginBottom: 10,
  },
})

const InputField = ({
  fieldKey,
  label,
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
  handleChangeFunction,
}) => {
  const handleChange = newText => {
    handleChangeFunction(fieldKey, newText)
  }

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{label}</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default InputField
