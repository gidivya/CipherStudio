const express = require('express');
const router = express.Router();
const CodeSnippet = require('../models/CodeSnippet');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');

// Create a new code snippet
router.post('/', authMiddleware,
  [
    body('code').notEmpty().withMessage('Code is required'),
    body('language').notEmpty().withMessage('Language is required'),
    body('title').notEmpty().withMessage('Title is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { code, language, title, description, isPublic, tags } = req.body;
      
      const snippet = new CodeSnippet({
        title,
        code,
        language,
        description,
        author: req.userId,
        isPublic,
        tags: tags || []
      });

      const savedSnippet = await snippet.save();
      res.status(201).json(savedSnippet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all public code snippets
router.get('/', async (req, res) => {
  try {
    const { language, search, page = 1, limit = 20 } = req.query;
    
    const query = { isPublic: true };
    if (language) query.language = language;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const snippets = await CodeSnippet.find(query)
      .populate('author', 'username profile')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await CodeSnippet.countDocuments(query);

    res.json({
      snippets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific code snippet
router.get('/:id', async (req, res) => {
  try {
    const snippet = await CodeSnippet.findById(req.params.id)
      .populate('author', 'username profile');
    
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a code snippet
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, code, description, language, tags } = req.body;
    
    const snippet = await CodeSnippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this snippet' });
    }
    
    if (title) snippet.title = title;
    if (code) snippet.code = code;
    if (description !== undefined) snippet.description = description;
    if (language) snippet.language = language;
    if (tags) snippet.tags = tags;
    
    const updatedSnippet = await snippet.save();
    res.json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a code snippet
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const snippet = await CodeSnippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this snippet' });
    }
    
    await CodeSnippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's code snippets
router.get('/user/:userId', async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .exec();
    
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

