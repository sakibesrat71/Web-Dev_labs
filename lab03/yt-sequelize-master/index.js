const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const port = 7000;
const cors = require("cors");
   
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize("test", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

// creating book table
const book_table = sequelize.define(
  "book_table",
  {
    name: Sequelize.STRING,
    author: Sequelize.TEXT,
    genre: Sequelize.STRING,
  },
  { tableName: "book_table" }
);

book_table.sync();

// creating user table
const user_table = sequelize.define(
  "user_table",
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  { tableName: "user_table" }
);

user_table.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));

  // post route for CREATING a book
app.post("/", async (req, res) => {
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
app.get("/", async (req, res) => {
  const alldata = await book_table.findAll();
  res.json(alldata);
});

// getting a single book by id
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await book_table.findOne({
    where: {
      id: id,
    },
  });
  res.json(data);
});

// getting books by pagination
app.get("/page/:page", async (req, res) => {
  const page = req.params.page; 
  const limit = 2;
  const offset = (page - 1) * limit;
  const data = await book_table.findAll({
    limit: limit,
    offset: offset,
  });
  res.json(data);
});


// put route for UPDATING a book
app.put("/:id", (req, res) => {
  
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
app.delete("/:id", (req, res) => {
  book_table.destroy({
    where: {
      id: req.params.id,
      // name: req.params.name,
    },
  });
  res.redirect("/");
});

// app.get("/search/:search", async (req, res) => {
//   const search = req.params.search;
//   const data = await book_table.findAll({
//     where: {
//       name: search,
//     },
//   });
//   res.json(data);
// });

// implement search by partial keywords
app.get("/search/:search", async (req, res) => {
  const search = req.params.search;
  const data = await book_table.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: "%" + search + "%",
      },
    },
  });
  res.json(data);
});

// implement search by partial keywords and search by type
app.get("/search/genre/:type", async (req, res) => {
  // const search = req.params.search;
  const type = req.params.type;
  const data = await book_table.findAll({
    where: {
      genre: {
        [Sequelize.Op.like]: "%" + type + "%",
      },
      
    },
  });
  res.json(data);
});

// implement search by partial keywords and search by author
// auth
app.get("/search/:search/:author", async (req, res) => {
  const search = req.params.search;
  const author = req.params.author;
  const data = await book_table.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: "%" + search + "%",
      },
      author: author,
    },
  });
  res.json(data);
});

// implement user signup
app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // check user already exists
  const user = await user_table.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    res.send("user already exists");
    res.status(401);
    return;
  }
  const saveUser = user_table.build({
    name: name,
    email: email,
    password: password,
  });
  try {
    await saveUser.save();
    res.send("user signed up");
  }
  catch (err) {
    console.log(err);
  }
});








app.listen(port, () => {
  console.log(`server starts at http://localhost:${port}`);
});
