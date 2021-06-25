import React from 'react'
import { NavigationContainer } from "@react-navigation/native"

import { AppRoutes } from "./app.routes"
import { useAuthContext } from '../context/auth'
import { SignIn } from '../screens/SignIn'

export function Routes() {

  const { user } = useAuthContext()

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}