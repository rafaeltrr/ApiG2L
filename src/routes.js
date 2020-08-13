const express = require('express');
const routes = express.Router();

const MotoristaController = require('./controllers/MotoristaController');
const VeiculoController = require('./controllers/VeiculoController');


//Motorista

routes.get('/motorista',MotoristaController.index);
routes.get('/motorista/:id',MotoristaController.Show);
routes.post('/motorista',MotoristaController.store);
routes.put('/motorista/:id',MotoristaController.update);
routes.delete('/motorista/:id',MotoristaController.destroy);
routes.put('/motorista/up/:id/:id_veiculo',MotoristaController.insertVeiculo);


//Veiculo


routes.get('/veiculo',VeiculoController.index_veiculo);
routes.post('/veiculo',VeiculoController.store_veiculo);
routes.get('/veiculo/:id',VeiculoController.Show_veiculo);
routes.put('/veiculo/:id',VeiculoController.update_veiculo);
routes.delete('/veiculo/:id',VeiculoController.destroy_veiculo);



module.exports = routes;