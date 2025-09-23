// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgzu03ibVpnV6pfrzyGKPVMHq49pKXonU",
  authDomain: "domu-1eb36.firebaseapp.com",
  projectId: "domu-1eb36",
  storageBucket: "domu-1eb36.firebasestorage.app",
  messagingSenderId: "55330220720",
  appId: "1:55330220720:web:b51451b05d2bedeb90a975",
  measurementId: "G-NRV898NJHM"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Export auth for use in other components
export { auth };