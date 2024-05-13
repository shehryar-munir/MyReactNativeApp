import React, { createContext, useContext, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from '@/Containers/Signup'
import Home from '@/Containers/Home'

const Stack = createStackNavigator()

// @refresh reset
export const AppNameContext = createContext(null)

const MainNavigator = () => {
  const [appName, setAppName] = useState('MyReactNativeApp')

  return (
    <AppNameContext.Provider
      value={{
        appName,
        setAppName,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name={'Signup'} component={Signup} />
        <Stack.Screen name={'Home'} component={Home} />
      </Stack.Navigator>
    </AppNameContext.Provider>
  )
}

export default MainNavigator
