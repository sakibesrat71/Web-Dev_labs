import React from "react";
import UserLibraryCards from "./UserLibraryCards";
import axios from "axios";

export default function UserLibraryGridShow() {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {

    axios
      .get("http://localhost:5001/book/recoend/jj",{
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`,
        }})
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {!books ? (
        <div >
          <h1 className="bg-gray-50 dark:bg-gray-900 text-white text-sm font-extrabold leading-none tracking-tight p-5">No Recommonded book for now</h1></div>
      ) : error ? (
        <div>Error</div>
      ) : (
        books.map((book) => <UserLibraryCards book={book} />)
      )}

    </div>
  );
}
