import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentTableLayout() {
  const [formData, setFormData] = useState({});

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/borrow/allBorrowedBooks")
      .then((response) => {
        setStudentList(response.data);
        console.log(studentList)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const returnbook = (bookId,userID) => {
    //write a post request to return the book
    axios
      .post("http://localhost:5001/borrow/return", {
        user_id: userID,
        book_id: bookId,
      })
      .then((response) => {
        console.log(response);
        alert("Book Returned Successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
              Borrower ID
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Borrower Mail
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
                Book ID
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
          
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student,index) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {student.user_id}
            </th>
            <td className="px-6 py-4">{student.userEmail}</td>

            <td className="px-6 py-4">{student.book_id}</td>
            <td className="px-6 py-4">{student.book_name}</td>
            <td className="px-6 py-4 text-right">
              
                <button
                  className="focus:outline-none text-white bg-red-700 
                  hover:bg-red-800 focus:ring-4 focus:ring-red-300 
                  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"

                  onClick={() => {
                    console.log(student.book_id);
                    returnbook(student.book_id,student.user_id);
                  }}
                >
                  Return2
                </button>
              
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
