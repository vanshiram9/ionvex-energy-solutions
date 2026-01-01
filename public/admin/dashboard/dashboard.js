import { db } from "/js/firebase/app.js";
import {
  collection,
  getCountFromServer,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ---------- COUNTS ---------- */

async function loadCounts() {

  // Dealers
  const dealersSnap = await getCountFromServer(
    query(collection(db, "users"), where("role", "==", "DEALER"))
  );
  document.getElementById("totalDealers").innerText = dealersSnap.data().count;

  // Pending Dealers
  const pendingSnap = await getCountFromServer(
    query(collection(db, "dealerRequests"), where("status", "==", "PENDING"))
  );
  document.getElementById("pendingDealers").innerText = pendingSnap.data().count;

  // Batteries
  const batteriesSnap = await getCountFromServer(
    collection(db, "batteries")
  );
  document.getElementById("totalBatteries").innerText = batteriesSnap.data().count;

  // Active Warranty
  const activeSnap = await getCountFromServer(
    query(collection(db, "batteries"), where("status", "==", "ACTIVE"))
  );
  document.getElementById("activeWarranties").innerText = activeSnap.data().count;

  // Claims
  const claimsSnap = await getCountFromServer(
    collection(db, "claims")
  );
  document.getElementById("totalClaims").innerText = claimsSnap.data().count;
}

/* ---------- ACTIVITY LOG ---------- */

async function loadActivity() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  const q = query(
    collection(db, "activityLogs"),
    orderBy("createdAt", "desc"),
    limit(8)
  );

  const snap = await getDocs(q);
  snap.forEach(doc => {
    const li = document.createElement("li");
    li.innerText = doc.data().message;
    list.appendChild(li);
  });
}

/* ---------- INIT ---------- */

loadCounts();
loadActivity();
