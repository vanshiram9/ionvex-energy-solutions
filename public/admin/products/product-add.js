import { db, storage } from "/js/firebase/app.js";
import {
  collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const showOnHome = document.getElementById("showOnHome").checked;
  const featured = document.getElementById("featured").checked;
  const images = document.getElementById("images").files;

  const imageUrls = [];

  for (let file of images) {
    const imgRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    imageUrls.push(url);
  }

  await addDoc(collection(db, "products"), {
    name,
    category,
    description,
    status,
    showOnHome,
    featured,
    images: imageUrls,
    createdAt: serverTimestamp()
  });

  alert("Product Added Successfully");
  form.reset();
});
