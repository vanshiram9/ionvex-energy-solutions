import { auth } from "./app.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { handleRoleRedirect } from "./role.js";

/* LOGIN */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await handleRoleRedirect(cred.user.uid);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}

/* LOGOUT */
window.logoutUser = async function () {
  await signOut(auth);
  location.href = "/login.html";
};

/* AUTO LOGIN CHECK */
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const onLoginPage = location.pathname.endsWith("login.html");
  if (onLoginPage) {
    handleRoleRedirect(user.uid);
  }
});
