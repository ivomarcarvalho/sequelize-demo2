const express = require('express');
const routes = require('./routes.js');
const SincronizarController = require('./controllers/SincronizarController');

const app = express();
app.use(express.json());

var i=0;
//SincronizarController.sincroniza(i);
setInterval(()=>{
    i++;
    SincronizarController.sincroniza(i);
},10000);


app.use(routes);

app.listen (3333,()=> console.log('Server is running'));