const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "movie",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));

// app.get("/",(req, res)=>{
//     const sqlInsert = "INSERT INTO movie_review (movieName, movieReview) VALUES('Titanic','Awesome movie');"
//     db.query(sqlInsert, (err, result)=> {
//         console.log(err);
//         console.log(result);
//         res.send("Hello N!");
//     })
// })

app.get("/api/get",(req,res)=>{
    const sql = "SELECT * FROM movie_review";
    db.query(sql, (err, result)=>{
        res.send(result);
    })
})

app.post("/api/insert",(req, res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sql = "INSERT INTO movie_review (movieName, movieReview) VALUES(?,?)"
    db.query(sql, [movieName, movieReview], (err, result)=>{
        console.log(result)
    })
})

// app.get("/",(req, res)=>{
//     res.send("Hello world!");
// })

app.listen(3001,()=>{
    console.log("server running on port 3001");
})