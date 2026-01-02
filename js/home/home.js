let lastRequestTime = 0;

function rateLimit(ms = 3000) {
  const now = Date.now();
  if (now - lastRequestTime < ms) {
    alert("Please wait before trying again.");
    return false;
  }
  lastRequestTime = now;
  return true;
}

// WARRANTY CHECK
document.getElementById("checkWarrantyBtn")?.addEventListener("click", async () => {
  if (!rateLimit()) return;

  const serial = document.getElementById("serialInput").value.trim();
  if (!serial) {
    alert("Enter serial number");
    return;
  }

  try {
    // 🔐 Firestore read (safe block)
    // const docSnap = await getDoc(...)
    document.getElementById("warrantyResult").innerText =
      "Warranty check in progress...";
  } catch (err) {
    console.error("Warranty error:", err);
    document.getElementById("warrantyResult").innerText =
      "Something went wrong. Try again.";
  }
});
