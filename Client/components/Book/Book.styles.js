import {StyleSheet} from 'react-native';
export const DEFAULT_FONT = 'Bodoni 72';
export const styles = StyleSheet.create({
  bookContainer: {
    margin: 10,
    overflowY: 'scroll',
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
  chapters: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    fontFamily: DEFAULT_FONT,
  },
  chapterTitles: {
    textAlign: 'center',
    margin: 5,
    fontSize: 15,
    fontFamily: DEFAULT_FONT,
  },
  quoteView: {
    height: 300,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#a5b8aa',
  },
  quoteText: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: DEFAULT_FONT,
  },
});
