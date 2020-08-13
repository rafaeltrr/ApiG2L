const express = require('express')
const mongoose = require('mongoose');
const requireDir = require('require-dir'); 
const cors = require('cors')
//Iniciando o App
const app = express();
//permição para enviar dados em JSON
app.use(cors());
app.use(express.json());

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/G2LAPI', { useUnifiedTopology: true,useNewUrlParser: true });
requireDir('./src/models');


//rotas
app.use('/api', require('./src/routes'))

app.listen(3001);