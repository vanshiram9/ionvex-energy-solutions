// js/firebase/role.js
// 🔐 LOCKED FILE — DO NOT MODIFY

import { db } from "./app.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================================
   ROLE BASED REDIRECT
================================ */
export async function redirectByRole(uid) {
  try {
    // user profile document
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      throw new Error("User profile not found");
    }

    const data = snap.data();
    const role = data.role;

    if (!role) {
      throw new Error("User role missing");
    }

    /* ================================
       ROLE ROUTING
    ================================ */
    switch (role) {
      case "admin":
        window.location.href = "/admin/dashboard/dashboard.html";
        break;

      case "dealer":
        window.location.href = "/dealer/dashboard.html";
        break;

      case "customer":
        window.location.href = "/customer/dashboard.html";
        break;

      default:
        throw new Error("Invalid user role");
    }

  } catch (err) {
    console.error("Role redirect error:", err.message);
    alert(err.message);
  }
}
