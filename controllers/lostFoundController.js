const LostFound = require('../models/LostFound');

const createPost = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('req.user:', req.user);

    const { title, description, type, location, contact } = req.body;

    if (!title || !description || !type || !location || !contact) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const post = await LostFound.create({
      title, description, type, location, contact,
      imageUrl: req.file ? req.file.path : '',
      postedBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Post Created', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await LostFound.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await LostFound.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.deleteOne();
    res.json({ success: true, message: 'Post Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, deletePost };