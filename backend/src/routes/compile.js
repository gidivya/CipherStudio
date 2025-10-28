const express = require('express');
const router = express.Router();
const { executeCode, compileCode } = require('../services/compiler');
const CodeSnippet = require('../models/CodeSnippet');
const { body, validationResult } = require('express-validator');

// Execute code
router.post('/execute', 
  [
    body('code').notEmpty().withMessage('Code is required'),
    body('language').notEmpty().withMessage('Language is required'),
    body('language').isIn(['c', 'cpp', 'java', 'python', 'javascript']).withMessage('Invalid language')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { code, language, input, userId } = req.body;

      const result = await executeCode(code, language, input || '');

      // Save execution history if userId is provided
      if (userId && result.status === 'success') {
        // Logic to save execution history
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        error: error.message 
      });
    }
  }
);

// Compile code
router.post('/compile',
  [
    body('code').notEmpty().withMessage('Code is required'),
    body('language').notEmpty().withMessage('Language is required'),
    body('language').isIn(['c', 'cpp', 'java', 'python', 'javascript']).withMessage('Invalid language')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { code, language } = req.body;
      const result = await compileCode(code, language);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  }
);

module.exports = router;

