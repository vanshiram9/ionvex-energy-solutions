import { db } from "../firebase/app.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loadProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "Loading products...";

  try {
    const q = query(
      collection(db, "products"),
      where("active", "==", true)
    );

    const snap = await getDocs(q);
    container.innerHTML = "";

    if (snap.empty) {
      container.innerHTML = "No products available";
      return;
    }

    snap.forEach(doc => {
      const p = doc.data();

      container.innerHTML += `
        <div class="product-card">
          <img src="${p.image || ''}" />
          <h3>${p.name}</h3>
          <p>${p.capacity}</p>
          <strong>₹${p.price}</strong>
        </div>
      `;
    });

  } catch (e) {
    console.error(e);
    container.innerHTML = "Failed to load products";
  }
}
