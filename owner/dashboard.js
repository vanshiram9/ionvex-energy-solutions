import { auth, db } from "../js/firebase/app.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const kpiBatteries = document.getElementById("kpiBatteries");
const kpiWarranties = document.getElementById("kpiWarranties");
const kpiClaims = document.getElementById("kpiClaims");
const kpiRisk = document.getElementById("kpiRisk");

onAuthStateChanged(auth, async user => {
  if (!user) {
    location.href = "/login.html";
    return;
  }

  // 🔐 ROLE CHECK
  const userSnap = await getDoc(doc(db, "users", user.uid));
  if (!userSnap.exists() || userSnap.data().role !== "owner") {
    alert("Access denied");
    location.href = "/";
    return;
  }

  loadKPIs();
  loadCharts();
});

async function loadKPIs() {
  const snap = await getDoc(doc(db, "stats", "global"));
  if (!snap.exists()) return;

  const d = snap.data();
  kpiBatteries.textContent = d.totalBatteries ?? 0;
  kpiWarranties.textContent = d.activeWarranties ?? 0;
  kpiClaims.textContent = d.totalClaims ?? 0;
  kpiRisk.textContent = d.riskIndex ?? "0%";
}

async function loadCharts() {
  const snap = await getDoc(doc(db, "stats", "monthly_current"));
  if (!snap.exists()) return;

  const d = snap.data();

  new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
      labels: d.months,
      datasets: [{
        label: "Sales",
        data: d.sales,
      }]
    }
  });

  new Chart(document.getElementById("claimsChart"), {
    type: "line",
    data: {
      labels: d.months,
      datasets: [{
        label: "Claims",
        data: d.claims,
      }]
    }
  });
}

document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  location.href = "/login.html";
};
