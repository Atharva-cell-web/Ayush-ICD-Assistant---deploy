require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb+srv://ayush:AyushProject2025@cluster0.kqztwpq.mongodb.net/?appName=Cluster0')



  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));