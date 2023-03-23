import React, { useEffect, useRef, useState } from 'react';
import otpVerify from "../../../assets/icon/otp-3.png";
import verified from "../../../assets/icon/verified.png";
import AuthenticationFormHeaderText from './AuthenticationFormHeaderText';
import HeaderCompanyLogo from './HeaderCompanyLogo';
import UserAuthenticationButtonText from './UserAuthenticationButtonText';
import axios from 'axios';

import { Routes, Route, useParams } from 'react-router-dom';


export default function UserOTPVerificationFormLayout() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  // use params from email
  let { email } = useParams();

  const otpSentNumber = "+880********"

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputsRef.current[index + 1].focus();
    }
    if (value === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputsRef.current[index - 1].focus();
    }
    if (event.key === 'Delete' && index < 5 && otp[index] === '') {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = otp.join('');
    const response = await axios.post('http://localhost:5001/moderator/verifyOTP', {
      otp: code,
      email: email 
  }).then((response) => {
      console.log(response);
      console.log(response.data);
      if(response.data.message === "OTP verified"){
        alert("OTP verified successfully");
        window.location.href = "/users/login";
      }
      else alert("Invalid OTP");
  }).catch((error) => {
      console.log(error);
      console.log(code);
      console.log(email);
      alert("OTP verification ERROR");
  });


    // alert(`OTP entered: ${code}`);
  };

  const handleResend = () => {
    alert('OTP resent');
  };

  return (
    <>
    <body className="min-h-screen bg-gray-100 text-gray-900 flex justify-center ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <HeaderCompanyLogo/>
            <div className="mt-12 flex flex-col items-center">
            <img  src={otpVerify} width="60px" height="60px" alt=""/>
      
            <br/>
      
                <AuthenticationFormHeaderText headerText="OTP Verification" />
                <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <br/>
                  <div class="flex flex-col mt-4">
                          <span>Enter the OTP we have send to&nbsp; 
                          <b>{otpSentNumber}</b></span>
                      </div>
                      <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-center text-center px-2 mt-5">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      className="m-2 border h-10 w-10 text-center form-control rounded border-x-rose-700 border-y-rose-700 hover:bg-pink-300"
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(event) => handleChange(index, event)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      ref={(el) => (inputsRef.current[index] = el)}
                    />
                  ))}
                </div>
                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-300 hover:text-gray-100-700 drop-shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                >
                   <img src={verified}  width="30px" height="30px" alt=""/>

                  <UserAuthenticationButtonText authButtonText="verify" onClick={handleSubmit} />
                </button>
              </form>



                </div> 
                </div>
            </div>
        </div>
        {/* <UserLoginFormSideImage  /> */}

    </body>
    </>
  )
}
