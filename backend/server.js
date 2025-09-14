const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/link');
const historyRoutes = require('./routes/history');
const whitelistRoutes = require('./routes/whitelist');

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/whitelist', whitelistRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur MongoDB :', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
