const express = require('express');
const routes = require('./routes.js');
const SincronizarController = require('./controllers/SincronizarController');

const app = express();
app.use(express.json());


setTimeout(() => {
    SincronizarController.sincroniza();
}, 10000,[])

setInterval(() => {
  SincronizarController.sincroniza();
}, 30000);


app.use(routes);

app.listen(3333, () => console.log('Server is running'));