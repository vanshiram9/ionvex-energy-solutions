// js/firebase/role.js

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./app.js";

/**
 * Firestore structure:
 * users/{uid}
 * {
 *   role: "admin" | "dealer" | "customer"
 * }
 */
export async function redirectByRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("User role not defined");
    return;
  }

  const { role } = snap.data();

  if (role === "admin") {
    location.href = "/admin/dashboard/dashboard.html";
  } else if (role === "dealer") {
    location.href = "/dealer/dashboard.html";
  } else if (role === "customer") {
    location.href = "/customer/dashboard.html";
  } else {
    alert("Invalid role");
  }
}
