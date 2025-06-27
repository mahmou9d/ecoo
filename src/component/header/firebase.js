// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyBb4RHCPYoSGDWl_a3Hu4SSj0L07brCV5Y",
  authDomain: "ecooooooo.firebaseapp.com",
  projectId: "ecooooooo",
  storageBucket: "ecooooooo.firebasestorage.app",
  messagingSenderId: "816932847444",
  appId: "1:816932847444:web:0a705c4085b7a8eaad12c1",
//   measurementId: "G-N2BNKTPRY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile')
provider.addScope('email')
export { auth, provider };