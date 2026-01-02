import { loadProducts } from "./products.js";
import { checkWarranty } from "./warranty.js";

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const btn = document.getElementById("checkWarrantyBtn");
  if (btn) {
    btn.addEventListener("click", checkWarranty);
  }
});
