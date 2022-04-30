import {StyleSheet} from 'react-native';
export const DEFAULT_FONT = 'Bodoni 72';
export const styles = StyleSheet.create({
  fieldInputs: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#a5b8aa',
    padding: 8,
    textAlign: 'center',
    margin: 10,
  },
  modalButton: {
    backgroundColor: '#a5b8aa',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    height: 40,
    justifyContent: 'center',
  },
  modalBackground: {
    backgroundColor: 'grey',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
  modalButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButtonText: {
    textAlign: 'center',
  },
});
