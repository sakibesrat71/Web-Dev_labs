/* eslint-disable no-undef */
import React from 'react';
import { NavLink } from 'react-router-dom';
import bookStoreImage from "../../../../assets//icon/bookstore.png";
import addBookImage from "../../../../assets/icon/addbook.png";
import editBookImage from "../../../../assets/icon/editbook.png";
import dashboardImage from "../../../../assets/img/dashboard.png";
import fineImage from "../../../../assets/img/fine.png";
import studentImage from "../../../../assets/img/student.png";
import facultyImage from "../../../../assets/img/teacher.png";

export default function NavBarLayout() {
  const menu = true;
  return (

    <nav className="flex flex-col mx-12 my-7 space-y-5" style={{ whiteSpace: 'nowrap',height: '100vh',color:"white" }}>
    <NavLink to="/dashboard" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
      <img src={dashboardImage} width="30px" alt="" />
      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>&nbsp; Dashboard</span>
    </NavLink>
    <NavLink to="/book-store" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
    <img src={bookStoreImage} width="30px" alt="" />

      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>Book Store</span>
    </NavLink>
    <NavLink to="/add-book" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
    <img src={addBookImage} width="30px" alt="" />

      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>Add Book</span>
    </NavLink>
    
    {/* <NavLink to="/delete-book" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
    <img src={deleteBookImage} width="30px" alt="" />

      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>Delete Book</span>
    </NavLink> */}
    <NavLink to="/student-history" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
      <img src={studentImage} width="30px" alt="" />
      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>Borrow History</span>
    </NavLink>
    
    <NavLink to="/fined-user" className={`inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 ${menu ? 'justify-start' : 'justify-center'}`}>
    <img src={fineImage} width="30px" alt="" />

      <span className="ml-2" style={{ display: menu ? 'inline' : 'none' }}>Fine User</span>
    </NavLink>
  </nav>

  )
}
