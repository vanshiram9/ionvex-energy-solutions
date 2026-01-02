import { auth, db } from "./app.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("loginBtn")?.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("errorMsg");

  if (!email || !password) {
    errorBox.innerText = "Email & password required";
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 🔍 Get role
    const userSnap = await getDoc(doc(db, "users", uid));

    if (!userSnap.exists()) {
      errorBox.innerText = "User role not found";
      return;
    }

    const role = userSnap.data().role;

    // 🔁 Redirect
    if (role === "ADMIN") {
      location.href = "/public/admin/dashboard/dashboard.html";
    } else if (role === "DEALER") {
      location.href = "/public/dealer/dashboard.html";
    } else {
      errorBox.innerText = "Unauthorized role";
    }

  } catch (err) {
    errorBox.innerText = err.message;
  }
});
