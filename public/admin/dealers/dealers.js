import { db } from "/js/firebase/app.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("dealerTable");

async function loadDealers() {
  const q = query(
    collection(db, "users"),
    where("role", "==", "DEALER")
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
      <td><span class="badge active">ACTIVE</span></td>
      <td>${d.createdAt?.toDate().toLocaleDateString() || "-"}</td>
      <td>
        <a href="/public/admin/dealers/dealer-detail.html?id=${docSnap.id}"
           class="btn small">View</a>
      </td>
    `;
    table.appendChild(tr);
  });
}

loadDealers();
