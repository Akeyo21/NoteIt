import {StyleSheet} from 'react-native';
export const DEFAULT_FONT = 'Bodoni 72';
export const styles = StyleSheet.create({
  bookContainer: {
    marginTop: 20,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: DEFAULT_FONT,
  },
  bookAuthor: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: DEFAULT_FONT,
  },
});
