import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './Books.styles';
import AddBookModal from '../AddBook/AddBookModal';
const Books = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateBookModal, setCreateBook] = useState(false);
  const getBooks = () => {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('BOOKS', data);
        setBooks(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);
  if (loading) {
    return <Text>LOADING!!</Text>;
  }
  const renderBook = item => {
    return (
      <TouchableOpacity
        style={styles.bookView}
        onPress={() => navigation.navigate('Book', {bookId: item.id})}>
        <Text style={[styles.allTexts, styles.bookTitle]}>{item.title}</Text>
        <Text style={[styles.allTexts, styles.author]}>{item.author}</Text>
      </TouchableOpacity>
    );
  };
  console.log('SHOW MODAL', openCreateBookModal);
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={books}
          renderItem={({item}) => renderBook(item, navigation)}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => setCreateBook(true)}>
        <Image source={require('../add.png')} style={{width: 60, height: 60}} />
      </TouchableOpacity>

      <AddBookModal
        openModal={openCreateBookModal}
        closeModalFunction={() => setCreateBook(false)}
      />
    </>
  );
};

export default Books;
