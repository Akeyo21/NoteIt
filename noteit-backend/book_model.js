const Pool = require("pg/lib").Pool;
// Putting such credentials is not safe
const pool = new Pool({
  user: "noteit_user",
  host: "localhost",
  database: "noteit_db",
  password: "12345",
  port: 5432,
});
const queryDB = (query, ...args) => {
  console.log("ARGUMENTS PASSED", args);
  return new Promise(function (resolve, reject) {
    pool.query(query, args, (error, results) => {
      if (error) {
        reject(error);
      }
      console.log("RESULT", results.rows);
      resolve(results.rows);
    });
  });
};
// Define functions that query the book model
const getAllBooks = () => {
  const query = "SELECT * FROM books;";
  return queryDB(query);
};

const selectBook = (...args) => {
  const bookId = args[0];
  return new Promise(function (resolve, reject) {
    // Querying for book chapters
    const bookChaptersQuery =
      "SELECT books.title as bookTitle, author, chapters.title, chapters.id FROM books INNER JOIN chapters ON books.id=chapters.book_id WHERE books.id=$1";
    const queryResults = {};
    return queryDB(bookChaptersQuery, bookId)
      .then((result) => {
        queryResults.chapters = result;
        // Querying for 5 quotes for the book
        const quotesQuery =
          "SELECT quote FROM books INNER JOIN quotes ON books.id=quotes.book_id WHERE books.id=$1 LIMIT 5";
        queryDB(quotesQuery, bookId)
          .then((results) => {
            queryResults.quotes = results;
            resolve(queryResults);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};

const selectChapter = (...args) => {
  const bookId = args[0];
  const chapterId = args[1];
  return new Promise(function (resolve, reject) {
    // Querying for book info
    const bookQuery = "SELECT title, author FROM books WHERE books.id=$1";
    const queryResults = {};
    return queryDB(bookQuery, bookId)
      .then((results) => {
        queryResults.book = results;
        // Selecting quotes under the chapter
        const quotesQuery =
          "SELECT quote FROM books INNER JOIN quotes ON books.id=quotes.book_id INNER JOIN chapters ON quotes.chapter_id = chapters.id WHERE books.id=$1 AND chapters.id=$2";
        queryDB(quotesQuery, bookId, chapterId)
          .then((results) => {
            queryResults.quotes = results;
            // Selecting notes under the query
            const chapterNotesQuery =
              "SELECT note FROM books INNER JOIN notes ON books.id=notes.book_id INNER JOIN chapters ON notes.chapter_id = chapters.id WHERE books.id=$1 AND chapters.id=$2";
            queryDB(chapterNotesQuery, bookId, chapterId)
              .then((result) => {
                queryResults.notes = results;
                resolve(queryResults);
              })
              .catch((e) => reject(e));
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};

/*const createBook = (body) => {
  return new Promise(function (resolve, reject) {
    const { title, author } = body;
    const query =
      "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *";
    pool.query(query, [name, email], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A book has been added:  ${results.rows[0]}`);
    });
  });
};

const deleteBook = () => {
  return new Promise(function (resolve, reject) {
    const query = "DELETE FROM books WHERE title = $1";
    pool.query(query, [request.params.title], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Deleted book with title ${request.params.title}`);
    });
  });
};*/

module.exports = {
  getAllBooks,
  //createBook,
  //deleteBook,
  selectBook,
  selectChapter,
};
