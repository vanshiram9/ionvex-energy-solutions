// js/firebase/auth.js
// 🔐 LOCKED FILE — DO NOT MODIFY

import { auth } from "./app.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ================================
   LOGIN
================================ */
export async function loginUser(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return cred.user;
  } catch (error) {
    throw formatAuthError(error);
  }
}

/* ================================
   LOGOUT
================================ */
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "/login.html";
}

/* ================================
   AUTH WATCHER
   (Guards ke liye)
================================ */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, user => {
    callback(user);
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
      msg = "Too many attempts. Try later";
      break;
  }

  return new Error(msg);
}
