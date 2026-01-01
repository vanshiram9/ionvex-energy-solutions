import { db } from "/js/firebase/app.js";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ---------- COUNTS ---------- */

async function loadCounts() {
  // Dealers
  const dealersSnap = await getDocs(
    query(collection(db, "users"), where("role", "==", "DEALER"))
  );
  document.getElementById("totalDealers").innerText = dealersSnap.size;

  // Pending dealer requests
  const pendingSnap = await getDocs(
    query(collection(db, "dealer_requests"))
  );
  document.getElementById("pendingDealers").innerText = pendingSnap.size;

  // Batteries
  const batteriesSnap = await getDocs(collection(db, "batteries"));
  document.getElementById("totalBatteries").innerText = batteriesSnap.size;

  // Active warranty
  const activeSnap = await getDocs(
    query(collection(db, "batteries"), where("status", "==", "ACTIVE"))
  );
  document.getElementById("activeWarranties").innerText = activeSnap.size;

  // Claims
  const claimsSnap = await getDocs(collection(db, "claims"));
  document.getElementById("totalClaims").innerText = claimsSnap.size;
}

/* ---------- ACTIVITY LOGS ---------- */

async function loadActivity() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  const snap = await getDocs(
    query(
      collection(db, "activity_logs"),
      orderBy("createdAt", "desc"),
      limit(10)
    )
  );

  snap.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.innerText = `${d.message} (${new Date(d.createdAt.seconds*1000).toLocaleString()})`;
    list.appendChild(li);
  });
}

/* ---------- INIT ---------- */

loadCounts();
loadActivity();
