// js/firebase/role.js
// 🔐 FINAL LOCKED FILE — PRODUCTION READY

import { db } from "./app.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================================
   CENTRAL ROUTE MAP
================================ */
const ROUTES = {
  admin: "/admin/dashboard/dashboard.html",
  dealer: "/dealer/dashboard.html",
  customer: "/customer/dashboard.html",
  login: "/login.html"
};

/* ================================
   ROLE BASED REDIRECT
================================ */
export async function redirectByRole(uid) {
  try {
    if (!uid) {
      throw new Error("Invalid user session");
    }

    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      throw new Error("User profile not found");
    }

    const data = snap.data();

    const role = data.role;
    const approved = data.approved ?? true;
    const status = data.status ?? "active";

    /* ================================
       SECURITY CHECKS
    ================================ */
    if (!role) {
      throw new Error("User role missing");
    }

    if (!approved) {
      throw new Error("Account not approved yet");
    }

    if (status !== "active") {
      throw new Error("Account is inactive");
    }

    /* ================================
       ROLE ROUTING
    ================================ */
    const target = ROUTES[role];

    if (!target) {
      throw new Error("Invalid user role");
    }

    window.location.replace(target);

  } catch (err) {
    console.error("Role redirect error:", err.message);

    alert(err.message);

    // Safety fallback
    window.location.replace(ROUTES.login);
  }
}
