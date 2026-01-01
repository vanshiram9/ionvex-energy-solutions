import { db } from "/js/firebase/app.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("requestTable");

async function loadRequests() {
  const q = query(
    collection(db, "dealerRequests"),
    where("status", "==", "PENDING")
  );

  const snapshot = await getDocs(q);
  table.innerHTML = "";

  snapshot.forEach(docSnap => {
    const d = docSnap.data();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.phone}</td>
      <td>${d.email}</td>
      <td>${d.city}</td>
      <td>${d.gst || "-"}</td>
      <td><span class="badge pending">PENDING</span></td>
      <td>
        <button class="btn success" onclick="approve('${docSnap.id}')">Approve</button>
        <button class="btn danger" onclick="reject('${docSnap.id}')">Reject</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

window.approve = async (id) => {
  if (!confirm("Approve this dealer?")) return;

  await updateDoc(doc(db, "dealerRequests", id), {
    status: "APPROVED",
    approvedAt: new Date()
  });

  alert("Dealer Approved");
  loadRequests();
};

window.reject = async (id) => {
  if (!confirm("Reject this dealer?")) return;

  await updateDoc(doc(db, "dealerRequests", id), {
    status: "REJECTED"
  });

  alert("Dealer Rejected");
  loadRequests();
};

loadRequests();
