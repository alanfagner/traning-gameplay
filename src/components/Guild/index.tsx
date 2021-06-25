import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { GuildIcon } from '../GuildIcon';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export type GuildProps = {
  id: string;
  name: string;
  icon?: string;
  owner: boolean;
}

type Props = TouchableOpacityProps & {
  data: GuildProps;
}

export function Guild({ data, ...rest }: Props) {

  const { icon, id, name, owner } = data;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>

      <GuildIcon iconId={icon} guildId={id} />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {name}
          </Text>

          <Text style={styles.subTitle}>
            {owner ? 'Administrador' : 'Convidado'}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" size={24} color={theme.colors.heading} />

    </TouchableOpacity>
  )
}
