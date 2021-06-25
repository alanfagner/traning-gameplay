import React from 'react';
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import DiscordPNG from '../../assets/discord_blue.png'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'

const { CDN_IMAGE } = process.env

interface IProps {
  guildId?: string;
  iconId?: string;
}

export function GuildIcon({ guildId, iconId }: IProps) {

  const { secondary50, secondary70 } = theme.colors;

  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <LinearGradient style={styles.guildIconContainer} colors={[secondary50, secondary70]}>
      <Image source={!!iconId ? { uri } : DiscordPNG} style={styles.image} />
    </LinearGradient>
  )
}
