const Note = require('../models/Note');

// Create Note
const createNote = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('req.user:', req.user);

    const title = req.body?.title;
    const subject = req.body?.subject;
    const description = req.body?.description;

    if (!title || !subject) {
      return res.status(400).json({
        message: 'Title and Subject are required.',
      });
    }

    const note = await Note.create({
      title,
      subject,
      description,
      fileUrl: req.file ? req.file.path : '',
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Note Uploaded',
      note,
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate(
      'uploadedBy',
      'name email'
    );

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    await note.deleteOne();

    res.json({
      success: true,
      message: 'Note Deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};