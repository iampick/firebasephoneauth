import React,{useState} from 'react'
import {RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";
import {authentication} from '../utils/firebase';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Inrex() {

  const [phoneNumber,setPhoneNumber] = useState('66');
  const [expandForm,setExpandForm] = useState(false);
  const [OTP,setOTP] = useState('');
  const [userInfo,setUserInfo] = useState(null)
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, authentication);
  }

  const requestOTP = () => {
    console.log('getting OTP')
    if(phoneNumber.length >= 10)
    {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      let phoneToVeryfy = `+${phoneNumber}`;
      signInWithPhoneNumber(authentication,phoneToVeryfy,appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        console.error(error);
      })
      }
}
  
  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if(otp.length === 6){
      let confirmationResult = window.confirmationResult;

      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        // const user = result.user;
        setUserInfo(result.user);
        console.log(result)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.error(error);

      });
      
    }
  }
  

  return (
    <>
    <div className="w-full md:w-2/5 p-6 mx-auto bg-white  dark:bg-gray-800">
    <div className="grid grid-cols-1 mt-4 xl:mt-8">
      <div>
      <h2 className="b-4 text-lg font-semibold text-blue-700 capitalize dark:text-white">Sign in whith phone number</h2>
      </div>
        <div className="w-full grid grid-cols-1 gap-2 mt-4 sm:grid-cols-1 items-center">
          <PhoneInput

      value={phoneNumber}
      onChange={setPhoneNumber}
      autoFocus={true}
    />
        </div>
        <div>
          <button 
          onClick={requestOTP}
          className="mt-4 p-2 bg-red-600 w-1/2 text-white rounded-lg">Get OTP</button>
        </div>
        {expandForm && (    <div className="  w-full  mx-auto bg-white  dark:bg-gray-800">
      <h2 className=" text-lg mt-4 font-semibold text-blue-700 capitalize dark:text-white">Enter OTP</h2>

        <div className=" grid grid-cols-1 gap-2 mt-1 sm:grid-cols-1 items-center">
<input className=" my-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={OTP} onChange={verifyOTP}></input>
        </div>
      {userInfo && JSON.stringify(userInfo)}
        
    </div>)}
        </div>
        <div id="sign-in-button"></div>
    </div>
    

    </>  )
}
