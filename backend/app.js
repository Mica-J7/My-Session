require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const sessionsRoutes = require('./routes/sessions');
const userRoutes = require('./routes/user');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée :', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/sessions', sessionsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
