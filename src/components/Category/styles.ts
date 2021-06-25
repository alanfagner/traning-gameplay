import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'


export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  content: {
    width: 100,
    height: 116,
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    position: 'absolute',
    top: 7,
    right: 7,
  },
  title: {
    marginTop: 15,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15
  },

})