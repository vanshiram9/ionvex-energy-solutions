// public/admin/dealers/dealers.js

import { db } from "/js/firebase/app.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("dealerRequestTable");

// 🔹 Load pending dealer requests
async function loadDealerRequests() {
  table.innerHTML = "";

  const snap = await getDocs(collection(db, "dealer_requests"));

  snap.forEach(docSnap => {
    const d = docSnap.data();

    if (d.status !== "PENDING") return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.email}</td>
      <td>${d.phone}</td>
      <td>${d.city}</td>
      <td>${d.requestedAt?.toDate().toLocaleString() || "-"}</td>
      <td>
        <button onclick="approveDealer('${docSnap.id}')">Approve</button>
        <button class="danger" onclick="rejectDealer('${docSnap.id}')">Reject</button>
      </td>
    `;

    table.appendChild(tr);
  });
}
// ===============================
// DEALER DETAIL PAGE LOGIC
// ===============================
import { doc, getDoc, updateDoc, collection, query, where, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/js/firebase/app.js";

const params = new URLSearchParams(window.location.search);
const dealerId = params.get("id");

async function loadDealerDetail() {
  if (!dealerId) return;

  const ref = doc(db, "dealer_requests", dealerId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();

  dName.innerText = d.name;
  dEmail.innerText = d.email;
  dPhone.innerText = d.phone;
  dCity.innerText = d.city;
  dStatus.innerText = d.status;

  // FUTURE SAFE STATS
  statBatteries.innerText = d.totalBatteries || 0;
  statWarranty.innerText = d.activeWarranty || 0;
  statClaims.innerText = d.totalClaims || 0;

  // BUTTON STATE
  blockBtn.style.display = d.status === "BLOCKED" ? "none" : "inline-block";
  unblockBtn.style.display = d.status === "BLOCKED" ? "inline-block" : "none";
}

blockBtn?.addEventListener("click", async () => {
  await updateDoc(doc(db, "dealer_requests", dealerId), {
    status: "BLOCKED"
  });
  alert("Dealer blocked");
  location.reload();
});

unblockBtn?.addEventListener("click", async () => {
  await updateDoc(doc(db, "dealer_requests", dealerId), {
    status: "APPROVED"
  });
  alert("Dealer unblocked");
  location.reload();
});

loadDealerDetail();

// 🔹 Load approved dealers
async function loadApprovedDealers() {
  const table = document.getElementById("dealersTable");
  if (!table) return;

  table.innerHTML = "";

  const snap = await getDocs(collection(db, "dealer_requests"));

  snap.forEach(docSnap => {
    const d = docSnap.data();
    if (d.status !== "APPROVED") return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.email}</td>
      <td>${d.phone}</td>
      <td>${d.city}</td>
      <td><span class="badge success">ACTIVE</span></td>
      <td>
        <a href="dealer-detail.html?id=${docSnap.id}">View</a>
      </td>
    `;

    table.appendChild(tr);
  });
}

loadApprovedDealers();

// ✅ Approve dealer
window.approveDealer = async (id) => {
  await updateDoc(doc(db, "dealer_requests", id), {
    status: "APPROVED",
    approvedAt: serverTimestamp()
  });

  alert("Dealer approved");
  loadDealerRequests();
};

// ❌ Reject dealer
window.rejectDealer = async (id) => {
  await updateDoc(doc(db, "dealer_requests", id), {
    status: "REJECTED"
  });

  alert("Dealer rejected");
  loadDealerRequests();
};

loadDealerRequests();
