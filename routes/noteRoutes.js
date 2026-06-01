const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const {
  createNote,
  getNotes,
  deleteNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({ storage });

router.post('/', upload.single('file'), protect, createNote);
router.get('/', getNotes);
router.delete('/:id', protect, deleteNote);

module.exports = router;