const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Guillaume:sKI2jBlCNpTLnFwa@clusterp6.zfgjw.mongodb.net/ClusterP6?retryWrites=true&w=majority',
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie!'))
.catch(() => console.log('Connexion à MongoDB échoucée!'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     console.log('Requête recu!');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// })

// app.use((req, res, next) =>{
//     res.json({message: 'Votre requête a bien été reçue!'});
//     next();
// });

// app.use((req, res) =>{
//     console.log('Réponse envoyé avec succès!');
// });

module.exports = app;
