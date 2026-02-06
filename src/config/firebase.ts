import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, setLogLevel } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Set Firestore log level to 'error' to suppress debug warnings
setLogLevel('error');

const app = initializeApp(firebaseConfig);

// Force Long Polling to bypass potential network/firewall restrictions
// This fixes the "hanging request" issue on some ISPs/Routers
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
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
