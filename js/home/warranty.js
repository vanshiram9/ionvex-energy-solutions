import { db } from "../firebase/app.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function checkWarranty() {
  const input = document.getElementById("serialInput");
  const result = document.getElementById("warrantyResult");

  if (!input || !result) return;

  const serial = input.value.trim();
  if (!serial) {
    result.innerText = "Enter serial number";
    return;
  }

  result.innerText = "Checking...";

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      result.innerText = "❌ Serial not found";
      return;
    }

    const data = snap.data();

    result.innerHTML = `
      ✅ Status: ${data.status}<br>
      🛡 Warranty till: ${data.warrantyEnd || "N/A"}
    `;

  } catch (e) {
    console.error(e);
    result.innerText = "Error checking warranty";
  }
}
