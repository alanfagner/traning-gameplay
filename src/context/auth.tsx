import React, { createContext, ReactNode, useState, useContext, useEffect } from "react"
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from 'expo-splash-screen';

import { api } from "../services/api"


const { SCOPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env
const { REDIRECT_URI } = process.env
const { RESPONSE_TYPE } = process.env

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextProps = {
  user?: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

type AuthProvider = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: AuthProvider) {

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)

  async function signIn() {
    try {
      setLoading(true)

      const { type, params } = await AuthSession.startAsync({
        authUrl: `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      }) as AuthorizationResponse


      if (type === 'success') {
        api.defaults.headers['authorization'] = `Bearer ${params.access_token}`
        const { data: { avatar, username, email, id } } = await api.get('/users/@me')


        const user = {
          avatar: `${CDN_IMAGE}/avatars/${id}/${avatar}.png`,
          username,
          email, id,
          firstName: username.split(' ')[0],
          token: params.access_token
        }

        await AsyncStorage.setItem('@gameplay:user', JSON.stringify(user))
        setUser(user)
        return
      }

      throw new Error('Authentication Failed')
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@gameplay:user')
    await AsyncStorage.removeItem('@gameplay:appointments')
    setUser(undefined)
  }


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    AsyncStorage.getItem('@gameplay:user').then((userStorage) => {
      if (userStorage) {
        const user = JSON.parse(userStorage) as User
        setUser(user);
        api.defaults.headers['authorization'] = `Bearer ${user.token}`
      }
      SplashScreen.hideAsync();
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ loading, signIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Auth Context not found')
  }

  return context;
}

export function useUserContext() {
  const { user } = useAuthContext()

  if (!user) {
    throw new Error('User Context not found')
  }

  return user;
}