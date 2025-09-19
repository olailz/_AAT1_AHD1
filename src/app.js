const expres = require('express');
const path = require('path');

const cors = require('cors'); 
require('dotenv').config();

const app = expres();
const PORT = process.env.PORT || 3000;

//importar conexión MongoDB
const {conectarDB} =  require('./data/tareasDataMongoDB');

//Conectar a la base de Datos
conectarDB();

app.use(expres.static(path.join(__dirname, '../public')));

//MIDDLEWARES GLOBALES
app.use(cors()); //Habilitar CORS para todas las rutas
app.use(expres.json()); //Para parsear el body de las peticiones como JSON

//Importamos las rutas
const tareasRoutes = require('./routes/tareasRoutes');

//configuracion de las rutas
app.use('/api/tareas', tareasRoutes);

app.listen(PORT, () => {
    console.log('Servidor ejecutando todoList');
    }) 


