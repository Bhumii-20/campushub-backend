const Event = require('../models/Event');

// Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    if (!title || !description || !date || !venue) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Event Created',
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .sort({ date: 1 });

    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();

    res.json({ success: true, message: 'Event Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEvent, getEvents, deleteEvent };