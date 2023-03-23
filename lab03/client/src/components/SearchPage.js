// creating a search page component
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState } from 'react';


const SearchPage = () => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [searchType, setSearchType] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchType === "name") {
            axios
                .get(`http://localhost:7000/search/${search}`)
                .then((res) => {
                    setSearchResults(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (searchType === "author") {
            axios
                .get(`http://localhost:7000/search/author/${search}`)
                .then((res) => {
                    setSearchResults(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (searchType === "genre") {
            axios
                .get(`http://localhost:7000/search/genre/${search}/`)
                .then((res) => {
                    setSearchResults(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label for="search">Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select name="search" id="search"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                </select>

                <button type="submit">Submit</button>
            </form>
            <div>
                {searchResults.map((result) => {
                    return (
                        <div key={result._id}>
                            <h4>{result.name}</h4>
                            <p>{result.author}</p>
                            <p>{result.genre}</p>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchPage;


