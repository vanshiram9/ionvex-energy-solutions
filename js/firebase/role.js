import { db } from "./app.js";
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function redirectByRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("User role not assigned");

  const role = snap.data().role;

  if (role === "admin") {
    location.href = "/public/admin/dashboard.html";
  } else if (role === "dealer") {
    location.href = "/public/dealer/dashboard.html";
  } else {
    throw new Error("Unauthorized role");
  }
}

export async function createDealerProfile(uid, data) {
  await setDoc(doc(db, "users", uid), {
    role: "dealer",
    ...data,
    createdAt: new Date()
  });
}
