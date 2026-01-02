import { auth } from "./app.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export async function loginUser(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function registerUser(email, password) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user;
}
