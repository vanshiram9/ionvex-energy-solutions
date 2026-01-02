// js/firebase/products.js
// 🔒 READ-ONLY public product fetch (SAFE)

import { db } from "./app.js";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function fetchFeaturedProducts(max = 6) {
  const q = query(
    collection(db, "products"),
    where("status", "==", "active"),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
    limit(max)
  );

  const snap = await getDocs(q);
  const products = [];

  snap.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}
