import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./app.js";

const auth = getAuth(app);

export async function loginUser(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}
