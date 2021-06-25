import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native'
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'

import PlayerSVG from '../../assets/player.svg'
import CalendarSVG from '../../assets/calendar.svg'
import { theme } from '../../global/styles/theme';
import { categories } from '../../utils/categories'

import { GuildIcon } from '../GuildIcon'
import { styles } from './styles'
import { GuildProps } from '../Guild';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';


export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description?: string;
}

type Props = RectButtonProps & {
  data: AppointmentProps
}


export function Appointment({ data, ...rest }: Props) {
  const { on, primary } = theme.colors;
  const category = categories.find((category) => category.id === data.category);

  return (
    <RectButton  {...rest}>
      <View style={styles.container}>
        <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>
            <Text style={styles.category}>
              {category?.title}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSVG />
              <Text style={styles.date}>{format(parseISO(data.date), "dd/MM 'às' HH:mm'h'")}</Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSVG fill={data.guild.owner ? primary : on} />
              <Text style={[styles.players, { color: data.guild.owner ? primary : on }]}>
                {data.guild.owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  )
}
