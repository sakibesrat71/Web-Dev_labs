import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditBookFormLayout(props) {
  const [name, setName] = useState(props.book.name);
  const [author, setAuthor] = useState(props.book.author);
  const [genre, setGenre] = useState(props.book.genre);
  const [barCode, setBarCode] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [barCodeError, setBarCodeError] = useState([]);
  const [nameError, setNameError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [bookList, setBookList] = useState([]);


  useEffect(() => {
    console.log(props)
   
      //setName(props.book.name);
    
  }, []);
  const addBook = () => {
    console.log(props.book.id);
    axios
      .put(`http://localhost:5001/book/${props.book.id}`, {
        name: name,
        author: author,
        genre: genre,
      })
    .then(() => {
      alert("updated");
      window.location.href = "/book-store";
    });

    setBookList([
      ...bookList,
      { name: name, author: author, genre: genre }
    ])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameRegex = /^[a-zA-Z]+$/;

    let isFormValid = true;

    if (!name) {
      setNameError("Please enter a name");
      isFormValid = false;
    } else if (!nameRegex.test(name)) {
      setNameError("Please enter a valid name with combination of A-Z and a-z.");
      isFormValid = false;
    } else {
      setNameError("");
    }

    if (false) {
      setAuthorError("Please enter an author name");
      isFormValid = false;
    } else {
      let authorWords = author.split(" ");
      if (authorWords.length < 2) {
        setAuthorError("Please enter at least two words for author");
        isFormValid = false;
      } else {
        setAuthorError("");
      }
    }

    if (!genre) {
      setGenreError("Please select a genre");
      isFormValid = false;
    } else {
      setGenreError("");
    }

    if (!shortDescription) {
      setShortDescriptionError("Please enter a short description");
      isFormValid = false;

    } else {
      setShortDescriptionError("");
    }
    if (!barCode) {
      setBarCodeError("Please enter a bar code");
      isFormValid = false;

    } else {
      setBarCodeError("");
    }

    // Validate form inputs
    if (isFormValid) {
      console.log("Form submitted");
      console.log(e);
      addBook(); // Call the function to submit the data to the database
    } else {
      console.log("Please fill out all fields");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          
          onChange={(e) => setName(e.target.value)}
          defaultValue={props.book.name}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          
          required
        />
        <div className="text-red-600">{nameError}</div>
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Book name
        </label>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          defaultValue={props.book.author}
           onChange={(e) => setAuthor(e.target.value)}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <div className="text-red-600">{authorError}</div>
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Author name
        </label>
      </div>

      <label for="underline_select" class="sr-only">
        Genre
      </label>
      <select
        defaultValue={props.book.genre}
        onChange={(e) => setGenre(e.target.value)}
        class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
      >
        <option selected>Choose a genre</option>
        <option value="novel">Novel</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>

      </select>
      <div className="text-red-600">{genreError}</div>


      <br/>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <div className="text-red-600">{shortDescriptionError}</div>
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Short Description
        </label>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
          focus:outline-none 
        focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
        px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
        onClick={addBook}
      >
        Edit
      </button>
    </form>
  );
}
