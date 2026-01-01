import { db } from "/js/firebase/app.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const seoRef = doc(db, "site_settings", "seo");

const siteTitle = document.getElementById("siteTitle");
const metaDescription = document.getElementById("metaDescription");
const metaKeywords = document.getElementById("metaKeywords");
const ogImage = document.getElementById("ogImage");
const canonicalUrl = document.getElementById("canonicalUrl");
const statusMsg = document.getElementById("statusMsg");

// 🔄 Load existing SEO
async function loadSEO() {
  const snap = await getDoc(seoRef);
  if (snap.exists()) {
    const d = snap.data();
    siteTitle.value = d.title || "";
    metaDescription.value = d.description || "";
    metaKeywords.value = d.keywords || "";
    ogImage.value = d.ogImage || "";
    canonicalUrl.value = d.canonical || "";
  }
}
loadSEO();

// 💾 Save SEO
document.getElementById("seoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  await setDoc(seoRef, {
    title: siteTitle.value,
    description: metaDescription.value,
    keywords: metaKeywords.value,
    ogImage: ogImage.value,
    canonical: canonicalUrl.value,
    updatedAt: new Date()
  });

  statusMsg.textContent = "SEO settings saved successfully ✅";
});
