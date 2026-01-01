import { auth, db } from "/js/firebase/app.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const errorEl = document.getElementById("error");

loginBtn.onclick = async () => {
  const email = email.value;
  const password = password.value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists() || snap.data().role !== "ADMIN") {
      throw new Error("Unauthorized access");
    }

    window.location.href = "/public/admin/dashboard/dashboard.html";

  } catch (err) {
    errorEl.innerText = err.message;
  }
};
