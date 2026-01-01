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
