const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['cpp', 'java', 'python', 'javascript', 'c']
  },
  description: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  compilationResult: {
    output: String,
    error: String,
    status: String, // 'success', 'error', 'pending'
    executionTime: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  executions: [{
    executedAt: Date,
    result: {
      output: String,
      error: String,
      status: String
    }
  }]
}, {
  timestamps: true
});

// Index for faster queries
codeSnippetSchema.index({ author: 1, createdAt: -1 });
codeSnippetSchema.index({ isPublic: 1, createdAt: -1 });
codeSnippetSchema.index({ language: 1 });

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);

