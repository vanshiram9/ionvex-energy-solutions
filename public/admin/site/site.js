import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/js/firebase/app.js";

const ref = doc(db, "site_settings", "main");

// LOAD
async function loadSite() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const d = snap.data();

  heroTitle.value = d.heroTitle || "";
  heroSubtitle.value = d.heroSubtitle || "";

  showProducts.checked = d.showProducts ?? true;
  showWarranty.checked = d.showWarranty ?? true;
  showDealer.checked = d.showDealer ?? true;
}

saveHome.onclick = async () => {
  await setDoc(ref, {
    heroTitle: heroTitle.value,
    heroSubtitle: heroSubtitle.value
  }, { merge: true });
  alert("Homepage updated");
};

saveSections.onclick = async () => {
  await setDoc(ref, {
    showProducts: showProducts.checked,
    showWarranty: showWarranty.checked,
    showDealer: showDealer.checked
  }, { merge: true });
  alert("Section visibility updated");
};

loadSite();
