import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABo743p0eTrL0u38rZDF3raU48xNSKnWM",
  authDomain: "movielibraryapp-4c501.firebaseapp.com",
  projectId: "movielibraryapp-4c501",
  storageBucket: "movielibraryapp-4c501.firebasestorage.app",
  messagingSenderId: "197922691563",
  appId: "1:197922691563:web:0b2f0da9d0ff76f083e1ae",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
