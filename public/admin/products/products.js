import { db } from "/js/firebase/app.js";
import {
  collection, getDocs, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("productsTable");

async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  table.innerHTML = "";

  snap.forEach(docSnap => {
    const p = docSnap.data();

    table.innerHTML += `
      <tr>
        <td>
          <img src="${p.images?.[0] || ''}" style="width:50px;border-radius:6px">
        </td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.status}</td>
        <td>${p.featured ? "⭐ Yes" : "No"}</td>
        <td>
          <a href="/public/admin/products/product-edit.html?id=${docSnap.id}" class="btn small">Edit</a>
          <button class="btn danger small" onclick="toggleStatus('${docSnap.id}', '${p.status}')">
            ${p.status === "ACTIVE" ? "Disable" : "Enable"}
          </button>
        </td>
      </tr>
    `;
  });
}

window.toggleStatus = async (id, status) => {
  await updateDoc(doc(db, "products", id), {
    status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
  });
  loadProducts();
};

loadProducts();
