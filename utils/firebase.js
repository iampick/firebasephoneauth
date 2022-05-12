
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKDSNzeRVo6gTkuRAPe4xcow19cK_FCRk",
  authDomain: "takemeout-otp.firebaseapp.com",
  projectId: "takemeout-otp",
  storageBucket: "takemeout-otp.appspot.com",
  messagingSenderId: "652518491672",
  appId: "1:652518491672:web:897b5c515aef560fd3a56d"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
