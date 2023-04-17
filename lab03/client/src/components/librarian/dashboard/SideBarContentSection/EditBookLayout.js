import React from 'react'
import HeaderLayout from '../headerSection/HeaderLayout'
import HeaderText from '../headerTitle/HeaderText'
import NavBarLayout from '../navBar/NavBarLayout'
import Settings from '../others/Settings'
import RightBarLayout from '../upperRighttBar/RightBarLayout'
import AddBookFormLayout from './AddBookInputCredentials/AddBookFormLayout'
import EditBookFormLayout from './AddBookInputCredentials/EditBookFormLayout'
import { NavLink, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';

// import BookEditTableLayout from './dataTableSection/BookEditTableLayout'

export default function EditBookLayout() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [id, setId] = useState("");

  const book = {
    id: id,
    name: name,
    author: author,
    genre: genre,
    
  };
  let params = useParams()
  useEffect(() => {
    console.log(params.book_id)
    axios.get(`http://localhost:5001/book/${params.book_id}`).then((response) => {
      setName(response.data.name);
      setAuthor(response.data.author);
      setGenre(response.data.genre);
      setId(response.data.id);
      book.name = response.data.name;
      book.author = response.data.author;
      book.genre = response.data.genre;
      book.id = response.data.id;
    });
  }, []);

  return (
    <body className="flex bg-gray-100 min-h-screen">
    <body className="flex bg-gray-100 min-h-screen" x-data="{panel:false, menu:true}">
    <aside classNameName={`flex flex-col ${window.outerWidth > 768 ? '' : 'hidden sm:flex sm:flex-col'}`} >
     <HeaderLayout />
     <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
       <NavBarLayout />
       <Settings />
     </div>

    </aside>
    <div className="flex-grow text-gray-800">
    <RightBarLayout searchInputPlaceholder="Search by Borrower ID..." />
     <main className="p-6 sm:p-10 space-y-6">
       <HeaderText text="Edit Book Form" />
     <div style={{width:"1000px"}} >
      
     <EditBookFormLayout book={book}/>

    
       </div>
     </main>
     
    </div>
    </body>

</body>
  )
}
