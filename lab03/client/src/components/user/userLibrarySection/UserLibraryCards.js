import React from "react";
import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/icon/cart.png";
import bookImage from "../../../assets/img/bookShow2.gif";
import axios from "axios";

export default function UserLibraryCards(props) {
  const book = props.book;

  const handleBorrow = async () => {
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

  return (
    <div class="h-auto max-w-full rounded-lg bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 ">
      {/* <NavLink href="#">
        <img
          class="rounded-t-lg"
          src={bookImage}
          alt=""
          style={{ marginLeft: "40px" }}
        />
      </NavLink> */}
      <div class="p-5">
        <NavLink href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:scale-110 hover:text-purple-600"
            style={{ textAlign: "center" }}
          >
            {book.name}
          </h5>
        </NavLink>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-400"
          style={{ textAlign: "center" }}
        >
          By : {book.author}
        </p>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-400"
          style={{ textAlign: "center" }}
        >
          Genre :{" "} {book.genre}
        </p>


        <button
          type="button"
          class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          style={{ width: "40%", display: "flex", alignItems: "center" }}
          onClick={handleBorrow}
        >
          <span>Borrow now&nbsp;</span>
          <img
            src={cartIcon}
            style={{ width: "30px", marginRight: "10px" }}
            alt=""
          />
        </button>


      </div>
    </div>
  );
}
