import { watchAuth } from "../firebase/auth.js";
import { redirectByRole } from "../firebase/role.js";
import { loadProducts } from "./products.js";
import { checkWarranty } from "./warranty.js";

/* ================================
   AUTH STATE CHECK (HOME GUARD)
================================ */
watchAuth(user => {
  if (user) {
    // user already logged in → go to dashboard
    redirectByRole(user.uid);
  }
});

/* ================================
   PUBLIC HOME FEATURES
================================ */
document.addEventListener("DOMContentLoaded", () => {

  // load public products
  loadProducts();

  // warranty check
  const btn = document.getElementById("checkWarrantyBtn");
  if (btn) {
    btn.addEventListener("click", checkWarranty);
  }

});
