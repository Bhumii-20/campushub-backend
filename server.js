require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
connectDB();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const eventRoutes = require('./routes/eventRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use('/api/auth', express.json(), authRoutes);
app.use('/api/users', express.json(), userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/events', express.json(), eventRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
  res.send('CampusHub API Running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});