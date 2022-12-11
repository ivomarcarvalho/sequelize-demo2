const express = require('express');
const routes = require('./routes.js');
const SincronizarController = require('./controllers/Sincronizar');
const app = express();
app.use(express.json());

var i=0;
setInterval(()=>{
    i++;
    SincronizarController.teste(i);
},10000);


app.use(routes);

app.listen (3333,()=> console.log('Server is running'));