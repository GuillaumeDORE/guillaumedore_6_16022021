const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

mongoose.connect('mongodb+srv://Guillaume:BDWftS1pkOncLWYy@cluster0.ihwb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie!'))
.catch(() => console.log('Connexion à MongoDB échouée!'));

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
