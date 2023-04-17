import React, { useState } from 'react';
import userSignUp from "../../../assets/icon//userSignUp.png";
import AuthenticationFormHeaderText from "./AuthenticationFormHeaderText";
import HeaderCompanyLogo from "./HeaderCompanyLogo";
import UserAuthenticationButtonText from "./UserAuthenticationButtonText";
import UserAuthPrivacyText from "./UserAuthPrivacyText";
import UserOptionalAuthHeadline from "./UserOptionalAuthHeadline";
import UserOptionalLoginAuth from "./UserOptionalLoginAuth";
import UserSignUpFormSideImage from "./UserSignUpFormSideImage";
import UserSignUpRedirectionSection from "./UserSignUpRedirectionSection";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UserSignUpFormLayout() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    // perform email validation and set error message if invalid
    if (!event.target.value.includes('@')) {
      setEmailError('Invalid email')
    } else {
      setEmailError('')
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }


  const handlePasswordChange = (event) => {

    // perform password validation and set error message if invalid
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(event.target.value);

    setPassword(event.target.value);

    if (!isValidPassword) {
      setPasswordError(
        "Password must contain at least 8 characters including at least one uppercase letter (A-Z), one lowercase letter (a-z), and one number (0-9)"
      );
    } else {
      setPasswordError('');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (emailError === '' && passwordError === '') {
      console.log('Form submitted')
      const response = axios.post('http://localhost:5001/auth/signUp', {
        name: name,
        email: email,
        password: password
      }).then((response) => {
        console.log(response);
        if (response.status == 200 && response.data.message != "email already exists") {
          
          const otpResponse = axios.post('http://localhost:5001/auth/sendotp', {
            email: email
          }).then((response) => {
            navigate(`/users/OTP-verification/${email}` );
          }).catch((error) => {
            console.log(error);
          });
        }
        else if (response.status == 200 && response.data.message == "email already exists") {
          alert("Email already exists")
        }
      }).catch((error) => {
        console.log(error);
      });

    }
  }
  return (
    <>
      <body className="min-h-screen bg-gray-100 text-gray-900 flex justify-center ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <HeaderCompanyLogo />
          <div className="mt-12 flex flex-col items-center">
            <AuthenticationFormHeaderText headerText="Sign up" />
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <div class="relative">
                    <input
                      type="text"
                      id="floating_filled"
                      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-120 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Name
                    </label>
                  </div>
                  <br></br>
                  <div class="relative">
                    <input
                      type="text"
                      id="floating_filled"
                      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-120 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>
                  {emailError !== "" && (
                    <p className="text-rose-600 text-sm mt-2 animate-pulse">
                      {emailError}
                    </p>
                  )}

                  <div class="relative">
                    <input
                      type="text"
                      id="floating_filled"
                      class="mt-7 block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-120 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Password
                    </label>
                  </div>
                  {passwordError !== "" && (
                    <p className="text-rose-600 text-sm mt-2 animate-pulse">
                      {passwordError}
                    </p>
                  )}

                  <button className=" mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-300 hover:text-gray-100-700 drop-shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type='submit'>
                    {/* <img src={}  width="30px" height="30px" alt=""/> */}
                    <img
                      src={userSignUp}
                      width="30px"
                      height="30px"
                      alt=""
                    />{" "}
                    <UserAuthenticationButtonText authButtonText="Sign up" />
                  </button>
                </form>

                <UserOptionalAuthHeadline optionalAuthHeadlineText="Or signup with" />
                <div className="flex items-center justify-center space-x-4 mt-3">
                  <UserOptionalLoginAuth />
                </div>
                <UserAuthPrivacyText
                  appName="appName"
                  termsOfServiceRedirectLink="/users/services"
                  policyRedirectLink="/users/policy"
                />
                <br />
                <UserSignUpRedirectionSection
                  redirectionLink="/users/login"
                  redirectionText="Login "
                  redirectionHeadline="Already have an account ?"
                />
              </div>
            </div>
          </div>
        </div>
        <UserSignUpFormSideImage />
      </body>
    </>
  );
}
