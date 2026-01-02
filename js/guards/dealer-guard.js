// 🔐 LOCKED FILE — Dealer Route Protection

import { auth } from "../firebase/app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "/login.html";
    return;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists() || snap.data().role !== "dealer") {
    alert("Unauthorized access");
    location.href = "/login.html";
  }
});
