require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MONGO_URI = process.env.MONGO_URI;

const sessionsRoutes = require('./routes/sessions');
const exercisesRoutes = require('./routes/exercises');
const userRoutes = require('./routes/user');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée :', err));

const app = express();

// middleware cors installé via npm à la place du cors manuel de base.
app.use(
  cors({
    origin: 'http://localhost:5173', // l'adresse de ton front
    credentials: true, // si tu utilises des tokens ou cookies
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sessions', sessionsRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
