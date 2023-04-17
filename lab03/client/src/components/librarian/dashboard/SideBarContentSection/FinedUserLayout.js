import React from 'react'
import HeaderLayout from '../headerSection/HeaderLayout'
import HeaderText from '../headerTitle/HeaderText'
import NavBarLayout from '../navBar/NavBarLayout'
import Settings from '../others/Settings'
import RightBarLayout from '../upperRighttBar/RightBarLayout'
import FinedUserTableLayout from './dataTableSection/FinedUserTableLayout'

export default function FinedUserLayout() {
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
       <HeaderText text="Fined Users" />
     <div style={{width:"1000px"}} >
       <FinedUserTableLayout/>
     

    
       </div>
     </main>
     
    </div>
    </body>

</body>
  )
}
