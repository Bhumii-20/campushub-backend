const express = require('express');
const multer = require('multer');
const path = require('path');

const {
  createNote,
  getNotes,
  deleteNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload Note
router.post(
  '/',
  upload.single('file'),
  protect,
  createNote
);

// Get Notes
router.get('/', getNotes);

// Delete Note
router.delete('/:id', protect, deleteNote);

module.exports = router;