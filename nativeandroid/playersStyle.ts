import { Appearance, StyleSheet } from "react-native";

const theme = Appearance.getColorScheme();

export const playerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  bilbilakContainer: {
    width: '100%',
    height: 25,
    backgroundColor: theme === 'light' ? '#ececec' : '#5a5a5a',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
