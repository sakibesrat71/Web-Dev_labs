import React, { useState } from 'react';

export default function UserProfileDataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Logic for displaying current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data ? data.slice(indexOfFirstRow, indexOfLastRow) : [];

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((data ? data.length : 0) / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        className={`${
          currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
        } hover:bg-blue-500 hover:text-white px-3 py-2 rounded-full mx-1 cursor-pointer`}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SR
            </th>
            <th scope="col" className="px-6 py-3">
             Book Name
            </th>
            <th scope="col" className="px-6 py-3">
             barcode
            </th>
            <th scope="col" className="px-6 py-3">
             Borrowed Date
            </th>
            <th scope="col" className="px-6 py-3">
              Returning Date
            </th>
            <th scope="col" className="px-6 py-3">
             RemainingDays
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => 
          {
            
            const today = Date.parse(new Date());
                const returnDate = Date.parse(row.return_date);
                const remainingDays = returnDate - today;
                const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24));
            return (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{row.book_name}</td>
              <td className="px-6 py-4">{row.id}</td>
              <td className="px-6 py-4">{row.borrow_date}</td>
              <td className="px-6 py-4">{row.return_date}</td>
              <td className="px-6 py-4">{days}</td>
            </tr>
          )})}
        </tbody>
      </table>
      <ul className="flex justify-center my-4">{renderPageNumbers}</ul>
    </div>
  );
}