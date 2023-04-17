import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserAuthPrivacyText({appName,termsOfServiceRedirectLink,policyRedirectLink}) {
  return (
    <p className="mt-6 text-xs text-gray-600 text-center">
    I agree to abide by LMS
    <NavLink to={termsOfServiceRedirectLink} className="border-b border-gray-500 border-dotted">
      Terms of Service
    </NavLink>
    and its
    <NavLink to={policyRedirectLink} className="border-b border-gray-500 border-dotted">
      Privacy Policy
    </NavLink>
  </p>
  )
}
