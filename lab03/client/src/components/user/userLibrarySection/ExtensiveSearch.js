import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExtensiveSearch({ data }) {

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const currentRows = []
  const [genre, setGenre] = useState("");
  


  // update the search results every time search button is clicked
  const updateSearchResults = () => {
    if (search.length > 0) {
      axios
        .get(`http://localhost:5001/search/${search}`)
        .then((res) => {
          setSearchResults(res.data);
          console.log(res.data);
        })
    } else {
      setSearchResults([]);
    }
  }

  useEffect(() => {
    updateSearchResults();
  }, [search])

  // filter searchresults array based on genre
  const genrefilter = (genre2) => {
    console.log(genre2);
    const filteredSearchResults = searchResults.filter((row) => {
      return row.genre === genre2;
    });
    if (filteredSearchResults.length > 0) {

      setSearchResults(filteredSearchResults);
    }
  }

  // filter searchresults array based on author
  const authorfilter = (author2) => {
    console.log(author2);
    const filteredSearchResults = searchResults.filter((row) => {
      return row.author === author2;
    });
    if (filteredSearchResults.length > 0) {

      setSearchResults(filteredSearchResults);
    }
  }









  return (
    <div className="relative overflow-x-auto">

      <br />
      <br />
      <form>
        <input type="text" value={search} role="search" className="py-2  pr-4 w-50% border-10 border-red-400 placeholder-gray-400 focus:bg-gray-50 
        rounded-lg align-middle mx-4"
          placeholder='Search by title'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <input type="text"  role="search" className="py-2  pr-4 w-50% border-10 border-red-400 placeholder-gray-400 focus:bg-gray-50 
        rounded-lg align-middle mx-4"
          placeholder='Search by author'
          onChange={(e) => {
            authorfilter(e.target.value);
          }}
        />

        {/* <button className="bg-blue-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 
        rounded mx-4"
          type='submit'
          onClick={() => {
            updateSearchResults();



          }}
        >
          Search
        </button> */}
      </form>

      <select
        value={genre}
        onChange={(e) => {
          genrefilter(e.target.value);

        }}
        class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
      >
        <option selected>Choose a genre</option>
        <option value="novel">Novel</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>

      </select>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SR
            </th>
            <th scope="col" className="px-6 py-3">
              Book Name
            </th>
            <th scope="col" className="px-6 py-3">
              author
            </th>
            <th scope="col" className="px-6 py-3">
              genre
            </th>


          </tr>
        </thead>
        <tbody>
          {searchResults.map((row, index) => {

            const today = Date.parse(new Date());
            const returnDate = Date.parse(row.return_date);
            const remainingDays = returnDate - today;
            const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24));
            return (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.author}</td>
                <td className="px-6 py-4">{row.genre}</td>


              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}