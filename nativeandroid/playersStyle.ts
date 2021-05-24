import {Appearance, StyleSheet} from 'react-native';

const theme = Appearance.getColorScheme();

export const playerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bilbilakContainer: {
    width: '100%',
    height: 25,
    backgroundColor: theme === 'light' ? '#ececec' : '#5a5a5a',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bilbilak: {
    width: 100,
    height: 10,
    borderRadius: 15,
    backgroundColor: '#a0a0a0',
  },
  turnsContainer: {
    width: '100%',
    height: 75,
    backgroundColor: theme === 'light' ? '#f1f0f0' : '#6f6f6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
