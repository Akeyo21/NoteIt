const Pool = require("pg/lib").Pool;
// Putting such credentials is not safe
const pool = new Pool({
  user: "noteit_user",
  host: "localhost",
  database: "noteit_db",
  password: "12345",
  port: 5432,
});

// Define functions that query the book model
const getBooks = () => {
  return new Promise(function (resolve, reject) {
    const query = "SELECT * FROM books;";
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      console.log("RESULT", results.rows);
      resolve(results.rows);
    });
  });
};

const selectBook = (id) => {
  return new Promise(function (resolve, reject) {
    const query =
      "SELECT books.title as bookTitle, author, chapters.title, chapters.id FROM books INNER JOIN chapters ON books.id=chapters.book_id WHERE books.id=$1";
    const queryResults = {};
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject("select error", error);
      }
      console.log("SELECT RESULT", results.rows);
      queryResults.chapters = results.rows;
      pool.query(
        "SELECT quote FROM books INNER JOIN quotes ON books.id=quotes.book_id WHERE books.id=$1 LIMIT 5",
        [id],
        (error, results) => {
          if (error) {
            reject("select error", error);
          }
          console.log("SELECT RESULT", results.rows);
          queryResults.quotes = results.rows;
          resolve(queryResults);
        }
      );
    });
  });
};

const selectChapter = (bookId, chapterId) => {
  return new Promise(function (resolve, reject) {
    // Selecting book
    console.log("BOOK ID", bookId);
    const query = "SELECT title, author FROM books WHERE books.id=$1";
    const queryResults = {};
    pool.query(query, [bookId], (error, results) => {
      if (error) {
        reject("select error", error);
      }
      console.log("SELECT book RESULT", results.rows);
      queryResults.book = results.rows;
      // selecting quotes
      pool.query(
        "SELECT quote FROM books INNER JOIN quotes ON books.id=quotes.book_id INNER JOIN chapters ON quotes.chapter_id = chapters.id WHERE books.id=$1 AND chapters.id=$2",
        [bookId, chapterId],
        (error, results) => {
          if (error) {
            reject("select error", error);
          }
          console.log("SELECT query RESULT", results.rows);
          // select notes
          queryResults.quotes = results.rows;
          pool.query(
            "SELECT note FROM books INNER JOIN notes ON books.id=notes.book_id INNER JOIN chapters ON notes.chapter_id = chapters.id WHERE books.id=$1 AND chapters.id=$2",
            [bookId, chapterId],
            (error, results) => {
              if (error) {
                reject("select error", error);
              }
              console.log("SELECT notes RESULT", results.rows);
              // select notes
              queryResults.notes = results.rows;
              resolve(queryResults);
            }
          );
        }
      );
    });
  });
};

const createBook = (body) => {
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
};

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  selectBook,
  selectChapter,
};
