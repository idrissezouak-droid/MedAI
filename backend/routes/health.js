const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    project: 'IA Doctor',
    version: '1.0.0',
  });
});

module.exports = router;
