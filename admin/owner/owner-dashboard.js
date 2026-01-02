// 🔐 Owner KPI Dashboard Logic

import { db } from "/js/firebase/app.js";
import {
  collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   KPI LOADERS
========================= */

async function loadKPIs() {
  const batteries = await getDocs(collection(db, "batteries"));
  const users = await getDocs(collection(db, "users"));
  const claims = await getDocs(collection(db, "claims"));

  let dealerCount = 0;
  let revenue = 0;
  let activeWarranty = 0;
  let approvedClaims = 0;

  users.forEach(u => {
    if (u.data().role === "dealer") dealerCount++;
  });

  batteries.forEach(b => {
    revenue += b.data().price || 0;
    if (b.data().warrantyActive) activeWarranty++;
  });

  claims.forEach(c => {
    if (c.data().status === "approved") approvedClaims++;
  });

  document.getElementById("kpiBatteries").innerText = batteries.size;
  document.getElementById("kpiDealers").innerText = dealerCount;
  document.getElementById("kpiWarranty").innerText = activeWarranty;
  document.getElementById("kpiRevenue").innerText = "₹" + revenue.toLocaleString();
  document.getElementById("kpiClaims").innerText = claims.size;
  document.getElementById("kpiClaimRate").innerText =
    claims.size ? Math.round((approvedClaims / claims.size) * 100) + "%" : "0%";
}

/* =========================
   CHARTS
========================= */

function salesChart() {
  new Chart(document.getElementById("salesChart"), {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun"],
      datasets: [{
        label: "Monthly Sales",
        data: [120, 180, 240, 300, 260, 310],
        borderWidth: 2
      }]
    }
  });
}

function claimChart() {
  new Chart(document.getElementById("claimChart"), {
    type: "doughnut",
    data: {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [{
        data: [60, 25, 15]
      }]
    }
  });
}

function dealerChart() {
  new Chart(document.getElementById("dealerChart"), {
    type: "bar",
    data: {
      labels: ["Dealer A", "Dealer B", "Dealer C"],
      datasets: [{
        label: "Sales",
        data: [120, 90, 75]
      }]
    }
  });
}

/* INIT */
loadKPIs();
salesChart();
claimChart();
dealerChart();
