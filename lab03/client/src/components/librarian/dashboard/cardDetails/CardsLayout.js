import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CardsLayout() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/moderator/getStats")
      .then((res) => {
        setStats(res.data);
        console.log(stats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">{stats.users}</span>
          <span className="block text-gray-500">Total Users</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21H5V3h8l6 6v12zM5 3h8"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">{stats.books}</span>
          <span className="block text-gray-500">Total Books</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl font-bold">{stats.fines}</span>
          
          <span className="block text-gray-500">Fines to collect</span>
        </div>
      </div>
    </>
  );
}
