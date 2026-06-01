const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { createPost, getPosts, deletePost } = require('../controllers/lostFoundController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({ storage });

router.post('/', upload.single('image'), protect, createPost);
router.get('/', getPosts);
router.delete('/:id', protect, deletePost);

module.exports = router;