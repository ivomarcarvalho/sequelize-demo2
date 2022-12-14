const express = require('express');
const routes = require('./routes.js');
const SincronizarController = require('./controllers/SincronizarController');
const Teste = require('./controllers/TesteCotroller');


const app = express();
app.use(express.json());

//Teste.findOrCreate(3,'ivomar');

var i=0;
setInterval(()=>{
    i++;
    SincronizarController.sincroniza(i);
},10000);


app.use(routes);

app.listen (3333,()=> console.log('Server is running'));