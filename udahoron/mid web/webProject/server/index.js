const express = require("express")
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "movie"
})
app.get("/", (req, res)=>{
    //res.send("Send from seds .");
    const sql = "INSERT INTO movie_review (movieName, movieReview) VALUES('ABC', 'not bad.');"
    db.query(sql, (err, result)=>{
        console.log(err);
        console.log(result);
        res.send("query is successfully executed.")
    })
})

app.listen(3001, ()=>{
    console.log("Hello ");
})