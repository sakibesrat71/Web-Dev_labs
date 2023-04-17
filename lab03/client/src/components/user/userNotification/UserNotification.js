import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NavBarLayout from '../userHomeSection/navbarSection/NavBarLayout';

export default function UserNotification() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get(`http://localhost:5001/notification/hh`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${token}`,
                },
            })
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            }
            ).catch((err) => {
                console.log(err)
            }
            )

    }, [])

    function notificationTypeHandler(type) {
        if (type === "fine") {
            window.location.href = "/profile"
        }
        else if (type === "borrow") {
            window.location.href = "/profile"
        }
    }
  

  

  

  return (
    <div className="relative overflow-x-auto">
        <header className="fixed w-full">
            <NavBarLayout />
        </header>
        <br/>
        <br/>
        <div className="flex flex-col mt-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SR
            </th>
            <th scope="col" className="px-6 py-3">
             notification
            </th>
            <th scope="col" className="px-6 py-3">
             date 
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => 
          {
            
            
            return (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{row.notificationMessage}</td>
              <td className="px-6 py-4">{row.notificationDate}</td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>
    </div>
  );
}