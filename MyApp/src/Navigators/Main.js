import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from '@/Containers/Signup'
import Home from '@/Containers/Home'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Signup} />
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  )
}

export default MainNavigator
