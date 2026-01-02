// js/firebase/auth.js
// 🔐 FINAL LOCKED FILE — PRODUCTION READY

import { auth } from "./app.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ================================
   AUTH PERSISTENCE
   (Vercel + Browser safe)
================================ */
setPersistence(auth, browserLocalPersistence);

/* ================================
   LOGIN
================================ */
export async function loginUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = cred.user;

    if (!user) {
      throw new Error("Authentication failed");
    }

    return user;

  } catch (error) {
    throw formatAuthError(error);
  }
}

/* ================================
   LOGOUT
================================ */
export async function logoutUser() {
  try {
    await signOut(auth);
  } finally {
    window.location.href = "/login.html";
  }
}

/* ================================
   AUTH STATE WATCHER
   (Route guards ke liye)
================================ */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, user => {
    callback(user || null);
  });
}

/* ================================
   ERROR FORMATTER
================================ */
function formatAuthError(error) {
  let msg = "Authentication failed";

  switch (error.code) {
    case "auth/user-not-found":
      msg = "Account not found";
      break;
    case "auth/wrong-password":
      msg = "Incorrect password";
      break;
    case "auth/invalid-email":
      msg = "Invalid email address";
      break;
    case "auth/user-disabled":
      msg = "Account disabled";
      break;
    case "auth/too-many-requests":
      msg = "Too many attempts. Try again later";
      break;
  }

  return new Error(msg);
}
