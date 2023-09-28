import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvE6cnQkX-1pPkEOzhIlX1JV3IB6Zy8Oo",
  authDomain: "phone-number-auth-86256.firebaseapp.com",
  projectId: "phone-number-auth-86256",
  storageBucket: "phone-number-auth-86256.appspot.com",
  messagingSenderId: "252952760175",
  appId: "1:252952760175:web:66f2cf2c0d6c8b7b26a29a",
  measurementId: "G-CXRJ1M020R",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
