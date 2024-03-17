// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMa7UjrG4_PtoRrMHicAZQmBKdU0q62_0",
  authDomain: "vue-order-75810.firebaseapp.com",
  projectId: "vue-order-75810",
  storageBucket: "vue-order-75810.appspot.com",
  messagingSenderId: "7205529904",
  appId: "1:7205529904:web:999852b3088d19874c80f5",
  measurementId: "G-K6JR5ZWP3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);