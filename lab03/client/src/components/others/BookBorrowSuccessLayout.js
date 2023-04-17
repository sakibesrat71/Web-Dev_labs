import React from 'react';

import { NavLink } from 'react-router-dom';
import successImage from "../../assets/img/success.gif";
export default function BookBorrowSuccessLayout() {
  return (


    <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
  <div class="text-center">
    <img src={successImage} style={{marginLeft:"200px"}} alt="errorImage" className="object-cover h-50 w-70 "/>
    <br/>
    <p class="text-base font-semibold text-indigo-600 ">200</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl animate-pulse ">Book Borrowed Successfully !</h1>
    <p class="mt-6 text-base leading-7 text-gray-600">Congratulations !We have successfully updated the data for you.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <NavLink to="/home" >
      <button
      type="button"
      class="animate-bounce inline-block rounded-full bg-neutral-800 px-6 pt-2.5 pb-2 text-xs font-medium uppercase
       leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_#332d2d] transition duration-150 
       ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)]
        focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#171717] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)]">
      <i class='bx bxs-share'></i>   Go Back Home
    </button>
    
   
    </NavLink>


  
     
    </div>
  </div>
</main>
  )
}

