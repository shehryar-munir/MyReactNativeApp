import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = ({ navigation, route }) => {
  const [username, setUserName] = useState(route.params?.data?.username?.value)
  const [password, setPassword] = useState(route.params?.data?.password?.value)
  const [careers, setCareers] = useState(
    route.params?.data.careerPreference?.value,
  )

  return (
    <View>
      <Text style={styles.homeTextStyle}>This is Home</Text>
      <Text style={styles.textStyle}> Name: {username}</Text>
      <Text style={styles.textStyle}> Password: {password}</Text>
      <Text style={styles.textStyle}>Preferred Careers</Text>
      {careers.map(career => {
        return (
          <Text key={career} style={styles.textStyle}>
            {' '}
            {career}
          </Text>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    margin: 10,
  },
  homeTextStyle: {
    fontSize: 30,
    justifyContent: 'center',
    margin: 10,
  },
})

export default Home
