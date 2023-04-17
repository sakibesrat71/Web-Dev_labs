import React from 'react'
import { NavLink } from 'react-router-dom'
import books from "../../../../assets/icon/books.png"
import uptime from "../../../../assets/icon/clock.png"
import users from "../../../../assets/icon/users.png"

export default function DataFetchLayout() {
  return (
    <div
        className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6"
      >
        <div className="col-span-2 mb-8">
          <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
            Trusted Worldwide
          </p>
          <h2
            className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white"
          >
            Trusted by over {"number from database"} readers 
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Our rigorous security and compliance standards are at the heart of
            all we do. We work tirelessly to protect you and your customers.
          </p>
          <div
            className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <NavLink
                to="/home"
                className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
              >
                Explore our Website
                <svg
                  className="w-5 h-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/about"
                className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
              >
                Visit who we are
                <svg
                  className="w-5 h-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0"
        >
          <div>
          
            <img src={uptime} alt='' />
            <h3 className=" mb-2 text-2xl font-bold dark:text-white" style={{marginTop:"10px"}}>
              99.99% uptime
            </h3>
      
          </div>
          <div>
   
              <img src={users} alt='' />
            <h3 className="mb-2 text-2xl font-bold dark:text-white" style={{marginTop:"10px"}}>{"user number"} Users</h3>
           
          </div>
          <div>
   
             <img src={books} alt='' />
            <h3 className="mb-2 text-2xl font-bold dark:text-white" style={{marginTop:"10px"}}>
              {"numbers of books"} Books
            </h3>
       
          </div>
  
        </div>
      </div>
  )
}
