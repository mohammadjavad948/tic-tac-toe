import { Appearance, Dimensions, StyleSheet } from "react-native";

const theme = Appearance.getColorScheme();

export const playerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: Dimensions.get('window').height - 100,
    width: '100%',
    height: Dimensions.get('window').height - 50,
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playersContainer: {
    width: '100%',
    height: Dimensions.get('window').height - 150,
    borderTopColor: '#7b7b7b',
    borderTopWidth: 5,
    backgroundColor: theme === 'light' ? '#f1f0f0' : '#6f6f6f',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  playerView: {
    width: '100%',
    alignItems: 'center',
  },
  playerCard: {
    width: '95%',
    borderColor: theme === 'dark' ? '#f1f0f0' : '#6f6f6f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'flex-start',
  },
  playerIcon: {
    fontSize: 20,
  },
  playerName: {
    marginLeft: 10,
  },
});
