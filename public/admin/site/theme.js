import { doc, getDoc, setDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/js/firebase/app.js";

const ref = doc(db, "site_settings", "theme");

async function loadTheme() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();
  primaryColor.value = d.primary || "#0f172a";
  secondaryColor.value = d.secondary || "#64748b";
  buttonColor.value = d.button || "#2563eb";
  fontFamily.value = d.font || "Inter";
  themeMode.value = d.mode || "light";
}

saveTheme.onclick = async () => {
  await setDoc(ref, {
    primary: primaryColor.value,
    secondary: secondaryColor.value,
    button: buttonColor.value,
    font: fontFamily.value,
    mode: themeMode.value,
    updatedAt: new Date()
  });
  alert("Theme updated successfully");
};

loadTheme();
