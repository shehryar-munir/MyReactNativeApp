import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
  },
})

const ErrorMessage = ({ errorMessage }) => {
  return (
    <View>
      <Text style={styles.errorTextStyle}> {errorMessage}</Text>
    </View>
  )
}

export default ErrorMessage
