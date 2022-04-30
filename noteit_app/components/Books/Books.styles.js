import {StyleSheet} from 'react-native';
export const DEFAULT_FONT = 'Bodoni 72';
export const styles = StyleSheet.create({
  bookView: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#8B7D7A',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    backgroundColor: '#FFF',
  },
  bookTitle: {
    fontSize: 16,
  },
  author: {
    fontStyle: 'italic',
  },
  allTexts: {
    fontFamily: DEFAULT_FONT,
  },
});
