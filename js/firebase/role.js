import { doc, getDoc } from "firebase/firestore";
import { db } from "./firestore.js";

export async function redirectByRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("User role not found");

  const role = snap.data().role;

  if (role === "admin") {
    window.location.href = "/public/admin/dashboard/dashboard.html";
  } 
  else if (role === "dealer") {
    window.location.href = "/public/dealer/dashboard.html";
  } 
  else {
    throw new Error("Unauthorized role");
  }
}
