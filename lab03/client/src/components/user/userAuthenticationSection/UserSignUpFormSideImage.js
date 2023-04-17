import React from 'react'
import signupFormSideImage from "../../../assets/img/usersignup.jpg"
export default function UserSignUpFormSideImage() {
  return (
    <div className="flex-1 bg-indigo-100 text-center  lg:flex ">
    <div
      className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" 
      
    >

        <img src={signupFormSideImage} className="mt-10" style={{height:"80%"}} alt=""/>
        {/* <img src={signupFormSideImage} alt=""/> */}
    </div>
   

  </div>
  )
}
