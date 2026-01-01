import { db } from "/js/firebase/app.js";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const dealerId = params.get("id");

// Elements
const nameEl = document.getElementById("dealerName");
const emailEl = document.getElementById("dealerEmail");
const phoneEl = document.getElementById("dealerPhone");
const cityEl = document.getElementById("dealerCity");
const statusEl = document.getElementById("dealerStatus");

const batteryCountEl = document.getElementById("batteryCount");
const activeWarrantyEl = document.getElementById("activeWarranty");
const claimCountEl = document.getElementById("claimCount");

const suspendBtn = document.getElementById("suspendBtn");

// Load Dealer Info
async function loadDealer() {
  const snap = await getDoc(doc(db, "users", dealerId));
  if (!snap.exists()) return;

  const d = snap.data();
  nameEl.textContent = d.name;
  emailEl.textContent = d.email;
  phoneEl.textContent = d.phone;
  cityEl.textContent = d.city;
  statusEl.textContent = d.status || "ACTIVE";
}

// Load Dealer Stats
async function loadStats() {
  // Batteries
  const batQ = query(
    collection(db, "batteries"),
    where("activatedBy", "==", dealerId)
  );
  const batSnap = await getDocs(batQ);
  batteryCountEl.textContent = batSnap.size;

  let active = 0;
  batSnap.forEach(b => {
    if (b.data().status === "ACTIVE") active++;
  });
  activeWarrantyEl.textContent = active;

  // Claims
  const claimQ = query(
    collection(db, "claims"),
    where("dealerId", "==", dealerId)
  );
  const claimSnap = await getDocs(claimQ);
  claimCountEl.textContent = claimSnap.size;
}

// Suspend Dealer
suspendBtn.addEventListener("click", async () => {
  if (!confirm("Suspend this dealer?")) return;

  await updateDoc(doc(db, "users", dealerId), {
    status: "SUSPENDED"
  });

  alert("Dealer suspended");
  loadDealer();
});

loadDealer();
loadStats();
