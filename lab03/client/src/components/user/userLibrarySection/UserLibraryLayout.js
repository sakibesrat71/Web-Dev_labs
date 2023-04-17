import React from 'react'
import FooterLayout from '../userHomeSection/footerSection/FooterLayout'
import NavBarLayout from '../userHomeSection/navbarSection/NavBarLayout'
import StarterLayout from '../userHomeSection/starterSection/StarterLayout'
import UserBookSearchInput from './UserBookSearchInput'
import UserLibraryGridShow from './UserLibraryGridShow'
import UserRecommodationShow from './UserRecommodationShow'

export default function UserLibraryLayout() {
  return (
    <>
     <header className="fixed w-full">
      <NavBarLayout />
    </header>
    <section className="bg-white dark:bg-gray-900">
    <StarterLayout />
    </section>
   
    <section className="bg-gray-50 dark:bg-gray-900">
      <UserBookSearchInput />
     </section>
     <section className="bg-gray-50 dark:bg-gray-900 " >
        <p></p>
     </section>
    

      <section className="bg-gray-50 dark:bg-gray-900">
      {/* <div style={{margin:"35px"}}> */}
      <UserLibraryGridShow />
      {/* </div> */}
     </section>

     <h1 className="bg-gray-50 dark:bg-gray-900 text-white text-2xl font-extrabold leading-none tracking-tight p-5">Recommonded </h1>

     <section className="bg-gray-50 dark:bg-gray-900">
      {/* <div style={{margin:"35px"}}> */}
      <UserRecommodationShow />
      {/* </div> */}
     </section>

   
     {/* <footer className="bg-white  dark:bg-gray-800">
      <FooterLayout />
     </footer> */}
    
    </>
  )
}
