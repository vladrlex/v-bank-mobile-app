import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDSFOYBbw6d-6jz5ibv_FZnQI7D8qKYaIY",
  authDomain: "v-bank-a89e5.firebaseapp.com",
  projectId: "v-bank-a89e5",
  storageBucket: "v-bank-a89e5.firebasestorage.app",
  messagingSenderId: "1047218155321",
  appId: "1:1047218155321:web:e0c90d718034a7faf6c2e8",
  measurementId: "G-HYM741H7X0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
