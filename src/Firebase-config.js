/**
 * File: Firebase-config.js
 * 
 * Description: This file handles the initialization of Firebase services
 * 
 * Proporties: firebaseConfig contains {apiKey, authDomain, projectID, storageBucket, messagingSenderId, appId, measurementId}
 * 
 * Exports:
 *  auth: Provides Firebase Authentication methods.
 *  db: Gives access to Firestore Database operations.
 *  storage: Enables Firebase Storage capabilities.
 *  app: Represents the initialized Firebase App instance.
 * 
 * @author: William Sun
 * @version: 1.0
 * @since: 2-18-2025
 */

// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);          // Firebase Authentication
export const db = getFirestore(app);       // Firestore Database
export const storage = getStorage(app);    // Firebase Storage

export default app;