const mongoose = require('mongoose');

const lostFoundSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LostFound', lostFoundSchema);