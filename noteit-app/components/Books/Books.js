import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AddSVG from '../add.png';
import {styles} from './Books.styles';
const Books = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={books}
          renderItem={({item}) => renderBook(item, navigation)}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.addButtonContainer}>
        <Image source={require('../add.png')} style={{width: 60, height: 60}} />
      </TouchableOpacity>
    </>
  );
};

export default Books;
