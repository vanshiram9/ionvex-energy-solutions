import { auth, db } from "/js/firebase/app.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/public/admin/auth/login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    window.location.href = "/public/admin/auth/login.html";
    return;
  }

  const role = snap.data().role;

  if (role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "/";
  }
});
