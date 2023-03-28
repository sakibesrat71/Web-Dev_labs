import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useParams } from "react-router-dom";



export default function BookListLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [bookList, setBookList] = useState([]);
  
  
  // const { page } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:7000/book/page/${currentPage}`).then((response) => {
      setBookList(response.data);
      
    });
    // pagination();
  }, [currentPage]);

  // const pagination = () => {
  //   console.log("clicked");
  //   console.log(currentPage);
  //   const page = currentPage;
  //    setBookList([]);
  //   axios.get(`http://localhost:7000/page/${page}`).then((response) => {
  //     console.log("dhukse");
  //     setBookList(response.data);
  //     console.log(currentPage);
  //     console.log(bookList);
  //   })
  // };


  // const indexOfLastBook = currentPage * booksPerPage;
  // const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
  //   pageNumbers.push(i);
  // } 

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:7000/book/${id}`)
      .then((response) => {
        // update the bookList state after deleting the book
        setBookList(bookList.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.reload();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Book List</h2>
      <table class="table" style={{ margin: "5%" }}>
        <thead>
          <tr>
            <th scope="col">#SL</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
            <th scope="col-2" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book) => {
            return (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  {/* <NavLink to={`/${book.id}'`}><button type="button" className="btn btn-success">Update</button></NavLink> */}

                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      console.log("clicked");
                      window.location.href = `/updateBook/${book.id}`;
                    }}
                  >
                    Update
                  </button>

                  <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">
                            Update Book Information
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Understood
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteBook(book.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div class="container " style={{ marginBottom: "10%" }}>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              
                
                  <button
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      // pagination();
                    }}
                    className="btn btn-outline-dark"
                    style={{ marginRight: "10px" }}
                  >
                    Prev
                  </button>
              
              
            </ul>
            <ul className="pagination">
              
                
                  <button
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      // pagination();
                    }}
                    className="btn btn-outline-dark"
                    style={{ marginRight: "10px" }}
                  >
                    Next
                  </button>
             
           
            </ul>
          </nav>
        </div>
        {/* <button
          type="submit"
          class="btn btn-primary "
          style={{ marginRight: "4%" }}
        >
          Show more
        </button> */}
        <NavLink to="/">
          <button type="submit" class="btn btn-info">
            Add more
          </button>
        </NavLink>
      </div>
    </div>
  );
}
