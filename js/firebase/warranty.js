// js/firebase/warranty.js
// 🔒 PUBLIC warranty verification (NO WRITE)

import { db } from "./app.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function checkWarranty(serial) {
  const q = query(
    collection(db, "warranties"),
    where("serial", "==", serial)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    return { status: "not_found" };
  }

  const data = snap.docs[0].data();
  const today = new Date();
  const expiry = data.expiryDate.toDate();

  if (expiry < today) {
    return { status: "expired", data };
  }

  return { status: "valid", data };
}
