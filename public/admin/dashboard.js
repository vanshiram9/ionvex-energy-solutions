// public/admin/dashboard/dashboard.js

import { auth, db } from "/js/firebase/app.js";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// DOM Elements
const totalDealersEl = document.getElementById("totalDealers");
const totalBatteriesEl = document.getElementById("totalBatteries");
const activeWarrantyEl = document.getElementById("activeWarranties");
const pendingDealersEl = document.getElementById("pendingDealers");
const totalClaimsEl = document.getElementById("totalClaims");
const activityListEl = document.getElementById("activityList");

// 🔐 Auth + Role Check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const userSnap = await getDocs(
    query(collection(db, "users"), where("uid", "==", user.uid))
  );

  if (userSnap.empty) {
    alert("User record not found");
    return;
  }

  const userData = userSnap.docs[0].data();
  if (userData.role !== "ADMIN") {
    alert("Unauthorized access");
    window.location.href = "/";
    return;
  }

  loadDashboard();
});

// 📊 Load Dashboard Data
async function loadDashboard() {

  // Dealers
  const dealersSnap = await getDocs(
    query(collection(db, "users"), where("role", "==", "DEALER"))
  );
  totalDealersEl.innerText = dealersSnap.size;

  // Pending Dealer Requests
  const pendingSnap = await getDocs(
    query(collection(db, "dealer_requests"), where("status", "==", "PENDING"))
  );
  pendingDealersEl.innerText = pendingSnap.size;

  // Batteries
  const batteriesSnap = await getDocs(collection(db, "batteries"));
  totalBatteriesEl.innerText = batteriesSnap.size;

  // Active Warranties
  const activeSnap = await getDocs(
    query(collection(db, "batteries"), where("status", "==", "ACTIVE"))
  );
  activeWarrantyEl.innerText = activeSnap.size;

  // Warranty Claims
  const claimsSnap = await getDocs(collection(db, "warranty_claims"));
  totalClaimsEl.innerText = claimsSnap.size;

  // Recent Activity
  const activitySnap = await getDocs(
    query(
      collection(db, "activity_logs"),
      orderBy("timestamp", "desc"),
      limit(5)
    )
  );

  activityListEl.innerHTML = "";
  activitySnap.forEach(doc => {
    const d = doc.data();
    activityListEl.innerHTML += `
      <li>
        <strong>${d.action}</strong><br>
        <small>${new Date(d.timestamp).toLocaleString()}</small>
      </li>
    `;
  });
                                              }
