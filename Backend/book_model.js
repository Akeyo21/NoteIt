const Pool = require("pg").Pool;
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
    const query = "SELECT title FROM books;";
    pool.query("SELECT * FROM books;", (error, results) => {
      if (error) {
        reject(error);
      }
      console.log("RESULT", results, error);
      resolve(results.rows);
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
};
