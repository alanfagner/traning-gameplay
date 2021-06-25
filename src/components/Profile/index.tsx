import React, { useContext } from 'react';
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useAuthContext, useUserContext } from '../../context/auth';
import { Avatar } from '../Avatar'


import { styles } from './styles'

export function Profile() {
  const { firstName, avatar } = useUserContext()
  const { signOut } = useAuthContext()


  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container} >
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>

          <Text style={styles.username}>{firstName}</Text>
        </View>
        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  )
}
