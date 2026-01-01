import { doc, getDoc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/js/firebase/app.js";

const ref = doc(db, "site_settings", "theme");

async function loadTheme() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();
  primaryColor.value = d.primary || "#0d6efd";
  secondaryColor.value = d.secondary || "#6c757d";
  fontFamily.value = d.font || "Inter";
  darkMode.checked = d.dark || false;
  radius.value = d.radius || 6;
}

saveTheme.onclick = async () => {
  await setDoc(ref, {
    primary: primaryColor.value,
    secondary: secondaryColor.value,
    font: fontFamily.value,
    dark: darkMode.checked,
    radius: radius.value
  });
  alert("Theme applied successfully");
};

loadTheme();
