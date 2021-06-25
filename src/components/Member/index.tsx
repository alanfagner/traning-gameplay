import React from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'

import { styles } from './styles'
import { Avatar } from '../Avatar'
import { theme } from '../../global/styles/theme'

export type MemberProps = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

type Props = {
  data: MemberProps;
}

export function Member({ data }: Props) {

  const { avatar_url, username, id, status } = data;

  const isOnline = status === 'online'

  return (
    <View style={styles.container}>
      <Avatar urlImage={avatar_url} />

      <View >
        <Text style={styles.title}>{username}</Text>

        <View style={styles.status}>
          <View style={[styles.bullet, { backgroundColor: isOnline ? theme.colors.on : theme.colors.primary }]} />

          <Text style={styles.titleStatus}>{isOnline ? 'Disponível' : 'Ocupado'}</Text>

        </View>
      </View>
    </View>
  )
}