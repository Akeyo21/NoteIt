const express = require("express");
const app = express();
const port = 3001;

const book_model = require("./book_model");
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const runModelFunction = (req, res, modelFunction, ...modelFunctionArgs) => {
  modelFunction(...modelFunctionArgs)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
app.get("/", (req, res) => {
  runModelFunction(req, res, book_model.getAllBooks);
});

app.get("/book/:id", (req, res) => {
  runModelFunction(req, res, book_model.selectBook, req.params.id);
});

app.get("/book/:bookId/chapter/:chapterId", (req, res) => {
  runModelFunction(
    req,
    res,
    book_model.selectChapter,
    req.params.bookId,
    req.params.chapterId
  );
});

/*app.post("/book", (req, res) => {
  book_model
    .createBook(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});*/

/*app.delete("/books/:title", (req, res) => {
  runModelFunction(req, res, book_model.deleteBook, req.params.title);
});*/

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
