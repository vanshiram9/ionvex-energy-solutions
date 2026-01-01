// js/firebase/app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// 🔥 Firebase Configuration (IONVEX ENERGY)
const firebaseConfig = {
  apiKey: "AIzaSyDvV77_17S233OHTDxxOHaEIeruo_IP-u8",
  authDomain: "ionvex-energy.firebaseapp.com",
  projectId: "ionvex-energy",
  storageBucket: "ionvex-energy.firebasestorage.app",
  messagingSenderId: "48652442204",
  appId: "1:48652442204:web:f23a353804282630c1e499",
  measurementId: "G-8R40WC76D4"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth
const auth = getAuth(app);

// 🗄️ Firestore DB
const db = getFirestore(app);

// 🖼️ Storage (images, documents)
const storage = getStorage(app);

// 📊 Analytics (optional)
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not supported in this environment");
}

// 📦 EXPORT (USE EVERYWHERE)
export {
  app,
  auth,
  db,
  storage,
  analytics
};
