const admin = require('firebase-admin');
const path = require('path');

let db = null;

function initFirebase() {
  if (admin.apps.length > 0) return; // already initialized

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    console.warn('[Firebase] FIREBASE_SERVICE_ACCOUNT_PATH not set — Firestore disabled.');
    return;
  }

  try {
    const serviceAccount = require(path.resolve(serviceAccountPath));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
    console.log('[Firebase] Firestore initialized ✅');
  } catch (err) {
    console.error('[Firebase] Failed to initialize:', err.message);
  }
}

function getDb() {
  return db;
}

function getAuth() {
  return admin.apps.length > 0 ? admin.auth() : null;
}

module.exports = { initFirebase, getDb, getAuth };
