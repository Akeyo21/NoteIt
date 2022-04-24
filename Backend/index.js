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
app.get("/", (req, res) => {
  book_model
    .getBooks()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  //res.status(200).send("Hello World!");
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

app.delete("/books/:title", (req, res) => {
  book_model
    .deleteBook(req.params.title)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/book/:id", (req, res) => {
  book_model
    .selectBook(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/book/:bookId/chapter/:chapterId", (req, res) => {
  book_model
    .selectChapter(req.params.bookId, req.params.chapterId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
