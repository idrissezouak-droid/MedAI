const { getAuth } = require('../config/firebase');

const DEMO_TOKEN = 'test-token-123';

async function authMiddleware(req, res, next) {
  // Skip auth for the health check endpoint
  if (req.path === '/health') {
    return next();
  }

  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Missing or invalid Authorization header. Expected: Bearer <token>',
    });
  }

  const token = authHeader.split(' ')[1];

  // ── Demo token (development shortcut) ──────────────────────
  if (token === DEMO_TOKEN) {
    req.user = { uid: 'demo-user', email: 'demo@iadoctor.ma', role: 'patient', demo: true };
    return next();
  }

  // ── Firebase ID token verification ─────────────────────────
  const auth = getAuth();
  if (!auth) {
    // Firebase not configured — reject non-demo tokens
    return res.status(403).json({
      success: false,
      message: 'Firebase Auth not configured. Use the demo token for testing.',
    });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      role: decoded.role || 'patient',
      demo: false,
    };
    return next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
}

module.exports = authMiddleware;
