const express = require('express');
const routers=express.Router();
const book_table=require('../model/book_table');

routers.get('/status',(req,res)=>{
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


module.exports=routers;



  