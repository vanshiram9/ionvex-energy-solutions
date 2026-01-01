import { db } from "/js/firebase/app.js";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tableBody = document.getElementById("productsTable");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

let allProducts = [];

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  tableBody.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";

  const snap = await getDocs(collection(db, "products"));
  allProducts = [];

  snap.forEach(docSnap => {
    allProducts.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderProducts(allProducts);
  loadCategories(allProducts);
}

loadProducts();

/* ================= RENDER TABLE ================= */
function renderProducts(products) {
  tableBody.innerHTML = "";

  if (products.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7'>No products found</td></tr>";
    return;
  }

  products.forEach(p => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${p.image || '/assets/images/no-image.png'}"
             style="width:60px;height:60px;object-fit:cover;border-radius:6px">
      </td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.voltage || "-"}</td>
      <td>${p.capacity || "-"}</td>
      <td>
        <span class="status ${p.status === 'ACTIVE' ? 'active' : 'inactive'}">
          ${p.status}
        </span>
      </td>
      <td>
        <a href="/public/admin/products/product-edit.html?id=${p.id}"
           class="btn small">Edit</a>

        <button class="btn danger small"
          onclick="deleteProduct('${p.id}')">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

/* ================= CATEGORY FILTER ================= */
function loadCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];

  categoryFilter.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
}

/* ================= FILTER HANDLER ================= */
function applyFilters() {
  let filtered = [...allProducts];

  if (categoryFilter.value) {
    filtered = filtered.filter(p => p.category === categoryFilter.value);
  }

  if (statusFilter.value) {
    filtered = filtered.filter(p => p.status === statusFilter.value);
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

/* ================= DELETE PRODUCT ================= */
window.deleteProduct = async function (id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  await deleteDoc(doc(db, "products", id));
  loadProducts();
};
