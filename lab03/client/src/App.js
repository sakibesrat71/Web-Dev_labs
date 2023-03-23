import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
import SearchPage from "./components/SearchPage";
function App() {
  return (
    <Router>
        <Routes>
         
          {/* //User Pages */}
          <Route path="/" element={<AddBookFormLayout />} />
          <Route path="/bookList/:page" element={<BookListLayout />} />
          <Route path="/updateBook/:id" element={<UpdateBookFormLayout />} />
          <Route path="/search" element={<SearchPage />} />
          </Routes>
    </Router>
  )
}

export default App;
