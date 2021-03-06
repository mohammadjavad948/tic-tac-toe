import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  board: {
    maxWidth: 600,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tile: {
    borderRadius: 5,
    marginLeft: 2.5,
    marginRight: 2.5,
    marginTop: 5,
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  tileTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontSize: 30,
  },
  ping: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
