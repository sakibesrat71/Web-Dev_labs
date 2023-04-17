import React, { useEffect,useState } from 'react'
import axios from 'axios'

export default function UserProfileSideBar() {
  const [user, setUser] = useState({})
  useEffect(() => {
    console.log('user profile side bar')
    const token = localStorage.getItem('token')
    axios
      .get(`http://localhost:5001/auth/loggedin`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setUser(response.data)
      })

  }, [])
  return (
    <div className="bg-white p-3 border-t-4 border-green-400">
    <div className="image overflow-hidden">
      <img
        className="h-auto w-full mx-auto"
        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
        alt=""
      />
    </div>
    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
      {user.name}
    </h1>
    <h3 className="text-gray-600 font-lg text-semibold leading-6">
     {user.email}
    </h3>
    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
     
    </p>
    <ul
      className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
    >
      <li className="flex items-center py-3">
        <span>Status</span>
        <span className="ml-auto"
          ><span className="bg-green-500 py-1 px-2 rounded text-white text-sm"
            >Active</span
          ></span
        >
      </li>
      <li className="flex items-center py-3">
        <span>Profession</span>
        <span className="ml-auto">Student</span>
      </li>
      <li className="flex items-center py-3">
        <span>Member since</span>
        <span className="ml-auto">{user.updatedAt}</span>
      </li>
    </ul>
  </div>
  )
}
