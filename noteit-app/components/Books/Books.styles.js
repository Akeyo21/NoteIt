import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('screen').height;
console.log('HEIGHT', height);
export const DEFAULT_FONT = 'Bodoni 72';
export const styles = StyleSheet.create({
  bookView: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#a5b8aa',
    shadowRadius: 2,
    shadowOpacity: 1,
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
  addButtonContainer: {
    //backgroundColor: 'red',
    position: 'absolute',
    //top: 0,
    //left: 0,
    bottom: 30,
    right: 20,
    zIndex: 5,
  },
});
