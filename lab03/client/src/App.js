// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookPage from "./pages/librarian/AddBookPage";
import BookStorePage from "./pages/librarian/BookStorePage";
import EditBookPage from "./pages/librarian/EditBookPage";
import FacultyHistoryPage from "./pages/librarian/FacultyHistoryPage";
import FinedUserPage from "./pages/librarian/FinedUserPage";
import LibrarianDashboardPage from "./pages/librarian/LibrarianDashboardPage";
import LibrarianLoginPage from "./pages/librarian/LibrarianLoginPage";
import StudentHistoryPage from "./pages/librarian/StudentHistoryPage";
import BookBorrowedSuccessPage from "./pages/user/BookBorrowedSuccessPage";
import UserBookFormPage from "./pages/user/UserBookFormPage";
import UserErrorPage from "./pages/user/UserErrorPage";
import UserHomePage from "./pages/user/UserHomePage";
import UserLibraryPage from "./pages/user/UserLibraryPage";
import UserLoginPage from "./pages/user/UserLoginPage";
import {UserProfilePageWithAuth} from "./pages/user/UserProfilePage";
import UserOTPVerificationFormPage from "./pages/user/UserOTPVerificationFormPage";
import UserNotification from "./components/user/userNotification/UserNotification";
import ExtensiveSearch from "./components/user/userLibrarySection/ExtensiveSearch";


import UserSignUpPage from "./pages/user/UserSignUpPage";
function App() {
  // var hours = 1; // to clear the localStorage after 1 hour
  // // (if someone want to clear after 8hrs simply change hours=8)
  // var now = new Date().getTime();
  // var setupTime = localStorage.getItem('setupTime');
  // if (setupTime == null) {
  //   localStorage.setItem('setupTime', now)
  // } else {
  //   if (now - setupTime > hours * 60 * 60 * 1000) {
  //     localStorage.clear()
  //     localStorage.setItem('setupTime', now);
  //   }
  // }
  return (

    <Router>    
      <Routes>
        {/* <Route path="/" element={<UserErrorPage />} /> */}
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/users/OTP-verification/:email" element={<UserOTPVerificationFormPage />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/library" element={<UserLibraryPage />} />
        <Route path="/profile" element={<UserProfilePageWithAuth />} />
        <Route path="/book-cart" element={<UserBookFormPage />} />
        <Route path="/borrowed-success" element={<BookBorrowedSuccessPage />} />
        {/* <Route path="/users/email-verification" element={<UserEmailVerificationFormPage />} /> */}
        {/* <Route path="/users/reset-password" element={<UserResetPasswordFormPage />} /> */}
        {/* <Route path="/users/OTP-verification/:email" element={<UserOTPVerificationFormPage />} /> */}
        
        <Route path="/librarian-login" element={<LibrarianLoginPage />} />
        <Route path="/dashboard" element={<LibrarianDashboardPage />} />
        <Route path="/book-store" element={<BookStorePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/edit-book/:book_id" element={<EditBookPage />} />
 
        <Route path="/student-history" element={<StudentHistoryPage />} />
        <Route path="/faculty-history" element={<FacultyHistoryPage />} />
        <Route path="/fined-user" element={<FinedUserPage />} />
        <Route path="/notifications" element={<UserNotification />} />
        <Route path="/extensive-search" element={<ExtensiveSearch />} />

        <Route path="/*" element={UserErrorPage} />
      </Routes>
    </Router>
  );
}

export default App;
