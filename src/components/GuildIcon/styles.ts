import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 62,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.colors.secondary100
  },
  guildIconContainer: {
    width: 65,
    height: 63,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 20,
  }
})