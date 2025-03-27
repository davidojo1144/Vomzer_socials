import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuLllxxOAeX9EHLeU4ym80JsDwsxolbhI",
  authDomain: "vomzersocials.firebaseapp.com",
  projectId: "vomzersocials",
  storageBucket: "vomzersocials.firebasestorage.app",
  messagingSenderId: "731426544427",
  appId: "1:731426544427:web:98b3d7998db665fce3036e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, app };