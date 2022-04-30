import React from 'react';
import {Text, TouchableOpacity, Modal, View, TextInput} from 'react-native';
import {styles} from './AddBookModal.styles';
function AddBookModal({openModal, closeModalFunction}) {
  return (
    <Modal transparent visible={openModal} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.formView}>
          <TextInput
            placeholder="Book Title"
            placeholderTextColor="black"
            style={styles.fieldInputs}
          />
          <TextInput
            placeholder="Book Author"
            placeholderTextColor="black"
            style={styles.fieldInputs}
          />

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}> Create Book</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModalFunction}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default AddBookModal;
