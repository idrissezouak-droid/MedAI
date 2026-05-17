const express = require('express');
const { getDb } = require('../config/firebase');

const router = express.Router();

/**
 * GET /api/history
 * Returns the last 20 analyses for the authenticated user.
 */
router.get('/', async (req, res) => {
  const db = getDb();

  if (!db) {
    return res.status(503).json({
      success: false,
      message: 'Firestore not available. Configure FIREBASE_SERVICE_ACCOUNT_PATH in .env.',
    });
  }

  try {
    const userId = req.user?.uid || req.query.userId || 'anonymous';

    const snapshot = await db
      .collection('analyses')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const history = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: history.length,
      userId,
      data: history,
    });
  } catch (error) {
    console.error('[history] Error:', error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'historique.",
    });
  }
});

/**
 * DELETE /api/history/:id
 * Deletes a specific analysis record by ID.
 */
router.delete('/:id', async (req, res) => {
  const db = getDb();

  if (!db) {
    return res.status(503).json({ success: false, message: 'Firestore not available.' });
  }

  try {
    const { id } = req.params;
    const userId = req.user?.uid || 'anonymous';

    const docRef = db.collection('analyses').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Analyse introuvable.' });
    }

    // Ensure the user can only delete their own records (unless demo)
    if (!req.user?.demo && doc.data().userId !== userId) {
      return res.status(403).json({ success: false, message: 'Accès interdit.' });
    }

    await docRef.delete();

    return res.status(200).json({ success: true, message: 'Analyse supprimée.' });
  } catch (error) {
    console.error('[history/delete] Error:', error);
    return res.status(500).json({ success: false, message: 'Erreur lors de la suppression.' });
  }
});

module.exports = router;
