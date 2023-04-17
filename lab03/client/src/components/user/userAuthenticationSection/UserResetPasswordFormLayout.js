import React, { useState } from "react";

// import resetPassword from "../../../assets/icon/resetPassword.png";
import AuthenticationFormHeaderText from './AuthenticationFormHeaderText';
// import HeaderCompanyLogo from './HeaderCompanyLogo';
import UserAuthenticationButtonText from './UserAuthenticationButtonText';
import UserResetPasswordFormSideImage from './UserResetPasswordFormSideImage';

export default function UserResetPasswordFormLayout() {
  const [password, setPassword] = useState("");
 
  const [passwordError, setPasswordError] = useState("");

 
  

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
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform form submission if inputs are valid
    if ( passwordError === "") {
      console.log("Form submitted");
    }
  };
  return (
    <>
    <body className="min-h-screen bg-gray-100 text-gray-900 flex justify-center ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <HeaderCompanyLogo/>
            <div className="mt-12 flex flex-col items-center" style={{marginTop:"170px"}}>
                <AuthenticationFormHeaderText headerText="Reset Password" />
                <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                    <div class="relative">
                    <input
                      type="password"
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
                     New Password
                    </label>
                  </div>
                  {passwordError !== "" && (
                    <p className="text-rose-600 text-sm mt-2 animate-pulse">
                      {passwordError}
                    </p>
                  )}
    
{/*       
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
                      Re-type Password
                    </label>
                  </div> */}
             <button
              className="  mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-300 hover:text-gray-100-700 drop-shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
            
              {/* <img src={}  width="30px" height="30px" alt=""/> */}
              <img src={resetPassword  }  width="30px" height="30px" alt=""/><UserAuthenticationButtonText authButtonText="Confirm Reset" />
            </button>
            </form>
       

        
           
            <br/>
         


                </div> 
                </div>
            </div>
        </div>
        <UserResetPasswordFormSideImage  />

    </body>
    </>
  )
}
