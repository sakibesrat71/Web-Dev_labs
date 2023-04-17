import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HeaderLayout() {
  return (
    <NavLink href="#" className="inline-flex items-center justify-center h-20 w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500">
             
              
      
       
          <span className="text-white text-4xl ml-2" x-show="menu">LMS</span>
        </NavLink>
  )
}
