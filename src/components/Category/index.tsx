import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
}

export function Category({ title, icon: Icon, checked = false, ...rest }: Props) {

  const { secondary80, secondary90, secondary85, secondary40, secondary50 } = theme.colors;

  return (
    <RectButton {...rest}>

      <LinearGradient
        style={styles.container}
        colors={[secondary80, secondary90]} >

        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked ? secondary85 : secondary50, secondary40]}>
          {checked &&
            <View style={styles.checked} />
          }
          <Icon width={48} height={48} />

          <Text style={styles.title}>
            {title}
          </Text>

        </LinearGradient>

      </LinearGradient>

    </RectButton>
  );
}