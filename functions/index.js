const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/* =====================================================
   GLOBAL KPI RECALCULATION
===================================================== */
exports.recalculateGlobalStats = functions.firestore
  .document("{collection}/{docId}")
  .onWrite(async () => {

    const batteriesSnap = await db.collection("batteries").get();
    const warrantiesSnap = await db.collection("warranties").get();
    const claimsSnap = await db.collection("claims").get();

    const totalBatteries = batteriesSnap.size;
    const activeWarranties = warrantiesSnap.docs.filter(
      d => d.data().status === "active"
    ).length;

    const totalClaims = claimsSnap.size;

    const riskIndex = totalBatteries > 0
      ? Math.round((totalClaims / totalBatteries) * 100)
      : 0;

    await db.collection("stats").doc("global").set({
      totalBatteries,
      activeWarranties,
      totalClaims,
      riskIndex: `${riskIndex}%`,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return null;
  });
