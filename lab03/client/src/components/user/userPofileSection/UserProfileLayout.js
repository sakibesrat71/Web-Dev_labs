import React from 'react'
import FooterLayout from '../userHomeSection/footerSection/FooterLayout'
import NavBarLayout from '../userHomeSection/navbarSection/NavBarLayout'
import UserProfileDataHeaderLayout from './UserProfileDataHeaderLayout'
import UserProfileDataTable from './UserProfileDataTable'
import UserProfileFineTable from './UserProfileFineTable'
import UserProfileSideBar from './UserProfileSideBar'
import { useEffect,useState } from 'react'
import axios from 'axios'

export default function UserProfileLayout() {
  // 
  const [dataArray,setDataArray] = useState([])
  const [finedataArray,setFineDataArray] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5001/borrow/borrowedBooks`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setDataArray(response.data)
      
      }
      )

      axios
      .get(`http://localhost:5001/borrow/fine`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setFineDataArray(response.data)
      
      }
      )

  }, [])

  return (
    <>
      <header className="fixed w-full">
        <NavBarLayout />
      </header>
      <br style={{ marginTop: "30px" }} />
      <div className="container mx-auto my-5  p-5 flex">
        <div className="w-3/12">
          <UserProfileSideBar />
          <div className="my-4"></div>
          <div className="bg-white p-3 hover:shadow">
            <div
              className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
            >

            </div>

          </div>
        </div>
        <div className="w-9/12 mx-2">
          <UserProfileDataHeaderLayout />
          <div className="my-4"></div>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <UserProfileDataTable data={dataArray} />

          </div>

          <div className="bg-white p-3 shadow-sm rounded-sm">
            <UserProfileFineTable data={finedataArray} />

          </div>
        </div>
      </div>
      {/* <footer className="bg-white  dark:bg-gray-800">
      <FooterLayout />
     </footer> */}
    </>
  )
}