import { db } from "./app.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function redirectByRole(uid) {
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) throw new Error("User role not found");

  const role = snap.data().role;

  if (role === "admin") location.href = "/admin/dashboard.html";
  else if (role === "dealer") location.href = "/dealer/dashboard.html";
  else throw new Error("Unauthorized role");
}
