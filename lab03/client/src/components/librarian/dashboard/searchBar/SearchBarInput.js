import React from 'react'

export default function SearchBarInput({placeholder}) {
  return (
    <input type="text" role="search" placeholder={placeholder} className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />

  )
}
