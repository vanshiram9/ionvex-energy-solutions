// js/firebase/auth.js

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./app.js";

/**
 * LOGIN
 */
export async function loginUser(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error) {
    console.error("Auth error:", error.code);

    let msg = "Login failed";
    if (error.code === "auth/user-not-found") msg = "User not found";
    if (error.code === "auth/wrong-password") msg = "Wrong password";
    if (error.code === "auth/invalid-email") msg = "Invalid email";

    throw new Error(msg);
  }
}

/**
 * LOGOUT
 */
export async function logoutUser() {
  await signOut(auth);
  location.href = "/login.html";
}
