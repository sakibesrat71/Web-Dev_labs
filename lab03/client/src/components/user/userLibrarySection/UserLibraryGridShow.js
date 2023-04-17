import React from "react";
import UserLibraryCards from "./UserLibraryCards";
import axios from "axios";

export default function UserLibraryGridShow() {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totalPage, setTotalPage] = React.useState(3);

  const [page, setPage] = React.useState(1);

  

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);  
    }
  };

  const totalPageNumber = async () => {

    const response = await axios.get(
      `http://localhost:5001/book/paging/total2`
    );
    console.log(response);
    const totalPage = response.data;
    console.log("total page " + totalPage);
    setTotalPage(totalPage);
    return totalPage;

  }

  const handleNext = async () => {
    // get all books

    const books = await axios.get(
      `http://localhost:5001/book/`
    );
      console.log(books.data.length);
    if(page<books.data.length/2){
      setPage(page + 1);
    }
  };
  

  React.useEffect(() => {
    const fetchBooks = async () => {
      console.log("page hoilo shurute " + page);
      try {
        const response = await axios.get(
          `http://localhost:5001/book/page/${page}`
        );
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };


    fetchBooks();
  }, [page]);


  return (
    <>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          books.map((book) => <UserLibraryCards book={book} />)
        )}

      </div>

      <div class="flex justify-center items-center p-3 space-x-3">
      <button
          type="button"
          class="focus:outline-none text-white bg-yellow-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          style={{ width: "8%", display: "flex", alignItems: "center" }}
          onClick={handlePrev}
          
        >
          <span>Prev&nbsp;</span>
        </button>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-purple-800 focus:ring-4 
          focus:ring-purple-300 font-medium rounded-lg 
          text-sm px-5 py-2.5 mb-2 dark:bg-green-600 
        dark:hover:bg-purple-700 dark:focus:ring-purple-900
         ;"
          style={{ width: "8%", display: "flex", alignItems: "center" }}

          onClick={handleNext}
          
        >
          <span>Next &nbsp;</span>
        </button>
      </div>
      
    </>

  );
}
