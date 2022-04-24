/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Books from './components/Books/Books';
import {styles, DEFAULT_FONT} from './App.styles';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Book from './components/Book/Book';
const App = () => {
  const Stack = createNativeStackNavigator();

  const Chapter = () => {
    /**
     * Displays the chapter information such as the quotes
     * and the notes associated with the chapter
     */
    return <Text>Chapter</Text>;
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

        <Stack.Screen
          name="Chapter"
          component={Chapter}
          options={{headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
