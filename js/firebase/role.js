import { db } from "./app.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function handleRoleRedirect(uid) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("No role assigned. Contact admin.");
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      location.href = "/admin/dashboard/dashboard.html";
    } 
    else if (role === "dealer") {
      location.href = "/dealer/dashboard.html";
    } 
    else if (role === "customer") {
      location.href = "/customer/dashboard.html";
    } 
    else {
      alert("Invalid role");
    }

  } catch (err) {
    alert("Role fetch error: " + err.message);
  }
}
