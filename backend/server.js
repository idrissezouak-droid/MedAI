require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initFirebase } = require('./config/firebase');

// Initialize Firebase Admin SDK before routes
initFirebase();

const healthRouter = require('./routes/health');
const symptomsRouter = require('./routes/symptoms');
const hospitalsRouter = require('./routes/hospitals');
const historyRouter = require('./routes/history');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(express.json());

// ── Auth (global, /health is skipped internally) ──────────
app.use(authMiddleware);

// ── Routes ────────────────────────────────────────────────
app.use('/', healthRouter);
app.use('/api/symptoms', symptomsRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/history', historyRouter);

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`\n🩺 IA Doctor backend running on http://localhost:${PORT}`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/symptoms/analyze`);
  console.log(`   GET  /api/hospitals/nearby`);
  console.log(`   GET  /api/history\n`);
});
