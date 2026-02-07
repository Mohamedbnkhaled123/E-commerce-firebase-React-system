import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Hardcoded for debugging to bypass Netlify stale env vars
const firebaseConfig = {
    apiKey: "AIzaSyAHesXKlIlqHKjjJI8Ab2V0rg56LGATE7E",
    authDomain: "velora-bags-e03c5.firebaseapp.com",
    projectId: "velora-bags-e03c5",
    storageBucket: "velora-bags-e03c5.firebasestorage.app",
    messagingSenderId: "459825471744",
    appId: "1:459825471744:web:e808fa11ddf40f26bb13e5",
    measurementId: "G-86589RR2ZV"
};

// Set Firestore log level to 'error' to suppress debug warnings
setLogLevel('error');


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Disable offline persistence temporarily to debug real-time sync with cloud
/*
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Firebase persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.warn('Firebase persistence not supported in this browser');
    }
});
*/
