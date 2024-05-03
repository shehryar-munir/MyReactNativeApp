import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '@/Containers/Login'
import ActionSheetComponent from '@/Components/ActionSheetComponent'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default MainNavigator
