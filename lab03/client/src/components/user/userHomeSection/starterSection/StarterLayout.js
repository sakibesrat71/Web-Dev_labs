import React from 'react'
import { NavLink } from 'react-router-dom'
export default function StarterLayout() {
  return (
   
    <div
    className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28"
  >
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
      >
        An Online <br />Store of books.
      </h1>
      <p
        className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
      >
        This free and open-source landing page template was built using the
        utility classNamees from
        <NavLink to="https://tailwindcss.com" className="hover:underline"
          >Tailwind CSS</NavLink>
        and based on the components from the
        <NavLink
          to="https://flowbite.com/docs/getting-started/introduction/"
          className="hover:underline"
          >Flowbite Library</NavLink >
        and the
        <NavLink to="https://flowbite.com/blocks/" className="hover:underline"
          >Blocks System</NavLink>.
      </p>
  
  </div>
  </div>

  )
}
