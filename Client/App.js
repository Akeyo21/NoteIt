/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import Books from './components/Books';
import {styles, DEFAULT_FONT} from './App.styles';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  const Stack = createNativeStackNavigator();

  const Book = ({route, navigation}) => {
    const selectedBookId = route.params.bookId;
    const [selectedBook, setSelectedBook] = useState({});
    const [loading, setLoading] = useState(false);
    const selectBook = () => {
      fetch(`http://localhost:3001/book/${selectedBookId}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log('BOOK', data);
          setSelectedBook(data[0]);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    };

    useEffect(() => {
      selectBook();
    }, []);
    if (loading) {
      return <Text>LOADING!!</Text>;
    }
    return (
      <SafeAreaView>
        <View style={styles.bookContainer}>
          <Text style={styles.bookTitle}>{selectedBook.title}</Text>
          <Text style={styles.bookAuthor}>{selectedBook.author}</Text>
        </View>
      </SafeAreaView>
    );
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
        <Stack.Screen
          name="Book"
          component={Book}
          options={{headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
