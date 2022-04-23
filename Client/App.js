/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, TouchableOpacity} from 'react-native';

import {styles, DEFAULT_FONT} from './App.styles';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  const [books, setBooks] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBooks = () => {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('DATA', data);
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

  console.log('BOOKS', books);
  books.length === 0
    ? console.log('NO books', books)
    : console.log(' BOOKS', books);
  const Stack = createNativeStackNavigator();
  const renderBook = (item, navigation) => {
    return (
      <TouchableOpacity
        style={styles.bookView}
        onPress={() => navigation.navigate('Book')}>
        <Text style={[styles.allTexts, styles.bookTitle]}>{item.title}</Text>
        <Text style={[styles.allTexts, styles.author]}>{item.author}</Text>
      </TouchableOpacity>
    );
  };
  const Books = ({navigation}) => {
    return (
      <SafeAreaView>
        <FlatList
          data={books}
          renderItem={({item}) => renderBook(item, navigation)}
        />
      </SafeAreaView>
    );
  };
  const Book = () => {
    return <Text>YOU ARE HERE</Text>;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Books"
          component={Books}
          options={{
            headerTitleStyle: {
              fontSize: 32,
              fontWeight: 'bold',
              fontFamily: DEFAULT_FONT,
            },
          }}
        />
        <Stack.Screen name="Book" component={Book} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
