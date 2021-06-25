

import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

export function Background({ children }: Props) {

  const { secondary80, secondary90 } = theme.colors

  return (
    <LinearGradient style={styles.container} colors={[secondary80, secondary90]} >
      {children}
    </LinearGradient>
  )
}