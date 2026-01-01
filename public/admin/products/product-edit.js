import { db, storage } from "/js/firebase/app.js";
import {
  doc, getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const id = new URLSearchParams(window.location.search).get("id");
const productRef = doc(db, "products", id);

const nameEl = document.getElementById("name");
const categoryEl = document.getElementById("category");
const descEl = document.getElementById("description");
const warrantyEl = document.getElementById("warranty");
const statusEl = document.getElementById("status");
const featuredEl = document.getElementById("featured");
const preview = document.getElementById("imagePreview");

let images = [];

async function loadProduct() {
  const snap = await getDoc(productRef);
  if (!snap.exists()) return;

  const p = snap.data();
  nameEl.value = p.name;
  categoryEl.value = p.category;
  descEl.value = p.description;
  warrantyEl.value = p.warrantyMonths;
  statusEl.value = p.status;
  featuredEl.checked = p.featured;
  images = p.images || [];

  renderImages();
}

function renderImages() {
  preview.innerHTML = "";
  images.forEach((url, i) => {
    preview.innerHTML += `
      <div class="img-box">
        <img src="${url}">
        <button onclick="removeImage(${i})">❌</button>
      </div>
    `;
  });
}

window.removeImage = async (index) => {
  const url = images[index];
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);

  images.splice(index, 1);
  renderImages();
};

document.getElementById("imageUpload").addEventListener("change", async (e) => {
  for (let file of e.target.files) {
    const fileRef = ref(storage, `products/${id}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    images.push(url);
  }
  renderImages();
});

document.getElementById("editProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  await updateDoc(productRef, {
    name: nameEl.value,
    category: categoryEl.value,
    description: descEl.value,
    warrantyMonths: Number(warrantyEl.value),
    status: statusEl.value,
    featured: featuredEl.checked,
    images,
    updatedAt: new Date()
  });

  alert("Product updated successfully");
});

loadProduct();
