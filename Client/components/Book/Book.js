import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Book.styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const Book = ({route, navigation}) => {
  const selectedBookId = route.params.bookId;
  const [bookChapters, setBookChapters] = useState([]);
  const [displayQuotes, setDisplayQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectBook = () => {
    fetch(`http://localhost:3001/book/${selectedBookId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('BOOK', data);
        setBookChapters(data.chapters);
        setDisplayQuotes(data.quotes);
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
  const bookTitle = bookChapters[0]?.booktitle;
  const bookAuthor = bookChapters[0]?.author;
  const renderQuotes = ({item, index}) => {
    return (
      <View style={styles.quoteView}>
        <Text style={styles.quoteText}>{item.quote}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.bookContainer}>
        <Text style={styles.bookTitle}>{bookTitle}</Text>
        <Text style={styles.bookAuthor}>{bookAuthor}</Text>

        <Text style={styles.chapters}>Interesting chapters</Text>
        <Carousel
          style={styles.carousel}
          renderItem={renderQuotes}
          data={displayQuotes}
          itemWidth={350}
          sliderWidth={350}
          onSnapToItem={index => {
            setActiveIndex(index);
          }}
          loop
        />
        <Pagination
          activeDotIndex={activeIndex}
          dotsLength={displayQuotes.length}
        />
        {bookChapters?.map((bookChapter, index) => (
          <TouchableOpacity
            onPress={navigation.navigate('Chapter', {
              bookId: selectedBookId,
              chapterId: bookChapter.id,
            })}>
            <Text key={index} style={styles.chapterTitles}>
              {bookChapter.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Book;
