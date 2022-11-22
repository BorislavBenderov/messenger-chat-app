import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAfrfFbsEdC_ggbScGWP2_KTxodUEuS-7I",
    authDomain: "messenger-chat-app-99974.firebaseapp.com",
    projectId: "messenger-chat-app-99974",
    storageBucket: "messenger-chat-app-99974.appspot.com",
    messagingSenderId: "298249166059",
    appId: "1:298249166059:web:ede5918f6acb67faeab2ae"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);