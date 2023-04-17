import React from 'react'
import NavBarLayout from '../userHomeSection/navbarSection/NavBarLayout'
import UserBookFormHeaderText from './UserBookFormHeaderText'
import UserBookFormInputCredential from './UserBookFormInputCredential'
import UserBookFormSideImage from './UserBookFormSideImage'

export default function UserBookFormLayout() {
  return (
   <>
     <header className="fixed w-full">
        <NavBarLayout />
      </header>
      <br style={{ marginTop: "30px" }} />
      <div className="container mx-auto my-5  p-5 flex">
        <div className="w-3/12">
          <UserBookFormSideImage />
          <div className="my-4"></div>
          <div className="bg-white p-3 hover:shadow">
            <div
              className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
            >

            </div>

          </div>
        </div>
        <div className="w-9/12 mx-2">
          <UserBookFormHeaderText />
          <div className="my-4"></div>
          <div className="bg-white p-3 shadow-sm rounded-sm">
           <UserBookFormInputCredential />

          </div>
        </div>
      </div>
   </>
  )
}
