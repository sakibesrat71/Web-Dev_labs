const express = require('express');
const routers = express.Router();
const book_table = require('../model/book_table');
const borrow_table = require('../model/borrow_table');
const borrow_history = require('../model/borrow_history');
const loggedin = require('../middleware/loggedin');
const jwt = require('jsonwebtoken');

routers.get('/status', (req, res) => {
  res.send('hello');
});
// posting a book
routers.post("/", async (req, res) => {
  const name = req.body.name;
  const author = req.body.author;
  const genre = req.body.genre;
  const saveBlog = book_table.build({
    name: name,
    author: author,
    genre: genre,
  });
  try {
    await saveBlog.save();
    res.send("data posted ");
  }
  catch (err) {
    console.log(err);
  }
  // await saveBlog.save();
  // res.send("data posted ");
});

// get route for GETTING all books
routers.get("/", async (req, res) => {
  const alldata = await book_table.findAll();
  res.json(alldata);
});

// getting a single book by id
routers.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await book_table.findOne({
    where: {
      id: id,
    },
  });
  res.json(data);
});

// getting books by pagination
routers.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const limit = 2;
  const offset = (page - 1) * limit;
  const data = await book_table.findAll({
    limit: limit,
    offset: offset,
  });
  res.json(data);
});

// getting the number of pages
routers.get("/paging/total2", async (req, res) => {
  const page = await book_table.findAll().then((data) => {
    return data.length;

  }).catch((err) => {
    console.log(err);
  });

  const limit = 2;
  const pages = Math.ceil(page / limit);
  res.json(pages);

  // const total = data.length;
  // const limit = 2;
  // const pages = Math.ceil(total / limit);
  // res.json(pages);
});

routers.get("/recoend/jj/", loggedin, async (req, res) => {

  console.log("recom e dhukse");
  // get user id from header
  const token = req.header("auth-token");
  const decoded = jwt.verify(token, process.env.TOKEN);
  const userId = decoded._id;
  // console.log(userId);
  const borrowedBooks = await borrow_history.findAll({
    where: {
      user_id: userId,
    },
  })
  const books = [];
  let recommendedBooks = [];
  let loop = true;
  if (loop) {
    console.log("ll: " + recommendedBooks.length);
    borrowedBooks.forEach(async element => {

      const book = await book_table.findOne({
        where: {
          id: element.book_id,
        },

      });
      // console.log("boi print hoy");
      // console.log(book);
      books.push(book);
      // console.log(books)
      const books1 = books.filter(book => book.genre == "fiction");
      const books2 = books.filter(book => book.genre == "non-fiction");
      const books3 = books.filter(book => book.genre == "novel");

      // get the most frequent genre
      const genre1 = books1.length;
      const genre2 = books2.length;
      const genre3 = books3.length;

      // console.log(genre1, genre2, genre3);
      const max = Math.max(genre1, genre2, genre3);
      let recommendedGenre;
      if (max == genre1) {
        recommendedGenre = "fiction";
      }
      else if (max == genre2) {
        recommendedGenre = "Non-fiction";
      }
      else {
        recommendedGenre = "novel";
      }

      // console.log(recommendedGenre);
      // get the latest 3 books of the most frequent genre
      recommendedBooks = await book_table.findAll({
        where: {
          genre: recommendedGenre,
        },
        limit: 3,
        order: [
          ['createdAt', 'DESC'],
        ],
      });



      // if (recommendedBooks.length == 3) {
      //   res.json(recommendedBooks);
      //   loop = false;
      // }


    })
  }

  // wait for recommendedBooks to be filled and then send it
  setTimeout(() => {
    console.log("recom e dhukse");
    console.log(recommendedBooks);
    res.json(recommendedBooks);
  }, 1000);




  console.log("full print hoy");
  // console.log(books);
  // filter books array by genre
  // const books1 = books.filter(book=>book.genre=="fiction");
  // const books2 = books.filter(book=>book.genre=="non-fiction");
  // const books3 = books.filter(book=>book.genre=="novel");

  // // get the most frequent genre
  // const genre1 = books1.length;
  // const genre2 = books2.length;
  // const genre3 = books3.length;

  // // console.log(genre1, genre2, genre3);
  // const max = Math.max(genre1, genre2, genre3);
  // let recommendedGenre;
  // if (max == genre1) {
  //   recommendedGenre = "fiction";
  // }
  // else if (max == genre2) {
  //   recommendedGenre = "Non-fiction";
  // }
  // else {
  //   recommendedGenre = "novel";
  // }

  // // console.log(recommendedGenre);
  // // get the latest 3 books of the most frequent genre
  // const recommendedBooks = await book_table.findAll({
  //   where: {
  //     genre: recommendedGenre,
  //   },
  //   limit: 3,
  //   order: [
  //     ['createdAt', 'DESC'],
  //   ],
  // });
  // res.json(recommendedBooks);
});
// put route for UPDATING a book
routers.put("/:id", (req, res) => {

  book_table.update(
    {
      name: req.body.name,
      author: req.body.author,
      genre: req.body.genre,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send("data updated");
});

// delete route for DELETING a book
routers.delete("/:id", (req, res) => {
  book_table.destroy({
    where: {
      id: req.params.id,
      // name: req.params.name,
    },
  });
  res.redirect("/");
});

// recommended books


module.exports = routers;



