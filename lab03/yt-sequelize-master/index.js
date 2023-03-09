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

sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));

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

app.delete("/:id", (req, res) => {
  book_table.destroy({
    where: {
      id: req.params.id,
      // name: req.params.name,
    },
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server starts at http://localhost:${port}`);
});
