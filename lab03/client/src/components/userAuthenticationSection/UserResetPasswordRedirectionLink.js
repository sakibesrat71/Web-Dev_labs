import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserResetPasswordRedirectionLink({redirectionHeadline,redirectionLink,redirectionText}) {
  return (
    <p className="mt-6 text-xs text-gray-600 text-center">
   {redirectionHeadline}
    <NavLink to={redirectionLink} className="border-b border-gray-500 text-blue-600 border-dotted text-lg">
      &nbsp;{redirectionText}
    </NavLink>
   
  </p>
  )
}
