import React from 'react'

export default function HeaderText({text}) {
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
    <div className="mr-6">
      <h1 className="text-4xl font-semibold mb-2">{text}</h1>
    </div>

  </div>
  )
}
