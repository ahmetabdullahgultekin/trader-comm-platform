// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBihipPYrRqcn0bb05cH1TVfRHE2itkjQI",
    authDomain: "trader-e-commerce.firebaseapp.com",
    projectId: "trader-e-commerce",
    storageBucket: "trader-e-commerce.firebasestorage.app",
    messagingSenderId: "322299012097",
    appId: "1:322299012097:web:5f92c91c5f6d397d794c00",
    measurementId: "G-7L1T6D6WL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence for Firestore
try {
    // This will enable offline support and caching
    import('firebase/firestore').then(({enableNetwork, disableNetwork}) => {
        enableNetwork(db).catch((error) => {
            console.warn('Could not enable Firestore network:', error);
        });
    });
} catch (error) {
    console.warn('Could not configure Firestore offline persistence:', error);
}

export default app;