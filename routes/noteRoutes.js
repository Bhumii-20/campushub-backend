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

router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.log('MULTER ERROR:', err.message);
      console.log('MULTER ERROR FULL:', JSON.stringify(err));
      return res.status(500).json({ message: err.message });
    }
    next();
  });
}, protect, createNote);

router.get('/', getNotes);
router.delete('/:id', protect, deleteNote);

module.exports = router;