import { auth, db } from "/js/firebase/app.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("error");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  errorBox.innerText = "";

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User role not found");
    }

    const role = userSnap.data().role;

    if (role === "ADMIN") {
      window.location.href = "/public/admin/dashboard/dashboard.html";
    } else if (role === "DEALER") {
      window.location.href = "/public/dealer/dashboard.html";
    } else {
      throw new Error("Invalid role");
    }

  } catch (err) {
    errorBox.innerText = err.message;
  }
});
