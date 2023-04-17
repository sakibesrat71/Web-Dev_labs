import React from 'react'
// import userResetPasswordSideImage from "../../../assets/img/userPasswordResetImage.jpg"
export default function UserResetPasswordFormSideImage() {
  return (
    <div className="flex-1 bg-indigo-100 text-center  lg:flex " >
    <div
      className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{marginTop:"120px"}}
      
    >

        <img src={userResetPasswordSideImage} alt=""/>
    </div>
   

  </div>
  )
}
