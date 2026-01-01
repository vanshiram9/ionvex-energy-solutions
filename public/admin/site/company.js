import { doc, getDoc, setDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/js/firebase/app.js";

const ref = doc(db, "site_settings", "company");

async function loadCompany() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();
  companyName.value = d.name || "";
  gst.value = d.gst || "";
  pan.value = d.pan || "";
  cin.value = d.cin || "";
  address.value = d.address || "";
  email.value = d.email || "";
  phone.value = d.phone || "";
}

saveCompany.onclick = async () => {
  await setDoc(ref, {
    name: companyName.value,
    gst: gst.value,
    pan: pan.value,
    cin: cin.value,
    address: address.value,
    email: email.value,
    phone: phone.value,
    updatedAt: new Date()
  });
  alert("Company profile saved");
};

loadCompany();
