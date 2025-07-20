// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBap2qJG6Isx3vU0LVLp-NeN5GbGwl7Ld8",
  authDomain: "tienda-online-react-c1669.firebaseapp.com",
  projectId: "tienda-online-react-c1669",
  storageBucket: "tienda-online-react-c1669.firebasestorage.app",
  messagingSenderId: "732859664085",
  appId: "1:732859664085:web:72567683f61372f3d2045c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);