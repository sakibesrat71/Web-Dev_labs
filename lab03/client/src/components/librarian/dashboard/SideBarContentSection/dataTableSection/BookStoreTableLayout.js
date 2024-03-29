import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
export default function BookStoreTableLayout() {
    const [formData, setFormData] = useState({});
    const [books, setBooks] = useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5001/book')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, []);

    const deleteBook = (id) => {
      axios
        .delete(`http://localhost:5001/book/${id}`)
        .then((response) => {
          // update the bookList state after deleting the book
          setBooks(books.filter((book) => book.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
        window.location.reload();
    };
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  return (
    <div
    className="relative overflow-x-auto shadow-md sm:rounded-lg"
    style={{ width: "100%" }}
  >
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Book ID
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
              Book Name
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
              </a>
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
              Author Name
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
              </a>
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
              Genre
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
              </a>
            </div>
          </th>
          
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
        
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
        
            </div>
          </th>
      
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            342435435
          </th>
          <td className="px-6 py-4">{ book.name}</td>

          <td className="px-6 py-4">{book.author}</td>
          <td className="px-6 py-4">{book.genre}</td>
          
          <td className="px-6 py-4 text-right">
          
            <NavLink to={`/edit-book/${book.id}`}>
              <button
                type="submit"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Edit
              </button>
            </NavLink>
          </td>
          <td className="px-6 py-4 text-right">
            
              <button
                type="submit"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
                font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 
                dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={()=>{
                  deleteBook(book.id);
                }}>
              
                Delete
              </button>
           
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
