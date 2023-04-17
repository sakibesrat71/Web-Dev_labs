import React from 'react'
import sideImage from "../../../assets/img/bf1.gif"

export default function UserBookFormSideImage() {
  return (
    <div className="bg-white p-3 border-t-4 border-purple-400" >
    <div className="image overflow-hidden" >
      <img
        className="h-auto w-full mx-auto"
        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
        alt=""
      />
    </div>
    <img src={sideImage} alt='' style={{marginTop:"40px"}} />
   
  </div>
  )
}
