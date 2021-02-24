const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

mongoose.connect('mongodb+srv://Guillaume:BDWftS1pkOncLWYy@cluster0.ihwb5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie!'))
.catch(() => console.log('Connexion à MongoDB échouée!'));

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
