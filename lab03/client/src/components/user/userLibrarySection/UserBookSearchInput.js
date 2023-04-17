import React from 'react'
import { useState, useRef, useEffect } from "react";
import axios from 'axios';

export default function UserBookSearchInput() {
  const [defaultValue, setDefaultValue] = useState("");
  const [results, setResults] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const resultContainer = useRef(null);

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    setShowResults(true);
  };




  const handleBorrow = async (book) => {
    const borrow_date = Date.parse(new Date());
    const return_date = borrow_date + 604800000;
    console.log(borrow_date + " " + return_date);
    const response = await axios.post("http://localhost:5001/borrow/borrow", {
      book_id: book.id,
      book_name: book.name,
      borrow_date: borrow_date,
      return_date: return_date,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      if (response.data == "book already borrowed")
        alert("book already borrowed");
      else {
        alert("book borrowed successfully");
      }
    }
    )
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (defaultValue.length > 0) {
      axios
        .get(`http://localhost:5001/search/${defaultValue}`)
        .then((res) => {
          setResults(res.data);
        })


      setResults(results);
    } else {
      setResults([]);
    }
  }, [defaultValue]);

  const renderItem = (item) => {
    return <div>{item}</div>;
  };


  return (

    <div className="py-5 flex  justify-center">
      <div
        tabIndex={1}
        className="relative"
      >
        <input
          value={defaultValue}
          onChange={handleChange}
          type="text"
          className="w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition"
          placeholder="Search your query..."
        />
        {/* Search Results Container */}
        {showResults && (
          <div className="relative mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
            {results.map((item, index) => {
              // console.log(item);
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                  }}
                  className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-4"
                >
                  {item.name}
                  {/* <div className='absolute right-0 top-0'> */}
                  <button className='absolute right-0 p-2 focus:outline-none text-white 
                  bg-purple-700 hover:bg-purple-800 focus:ring-4 
                  focus:ring-red-300 font-medium rounded-lg 
                  text-sm px-5 py-2.5 mr-2 mb-2 
                  dark:bg-purple-600 
                  dark:hover:bg-purple-700 
                  dark:focus:ring-purple-900 '
                    onClick={() => handleBorrow(item)}
                  >
                    Borrow now
                  </button>
                  {/* </div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>


  )
}
