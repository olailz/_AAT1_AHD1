const mongoose = require('mongoose')


//Middleware para validar ObJectId de MongoDB
const validarTareaId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID de la tarea debe ser un número válido.' });
    }
    req.tareaId = id;
    next();
};

//Middleware para validar datos de tarea
const validarDatosTarea = (req, res, next) => {
    const {titulo} = req.body;
    
    if(req.method ===  'POST' || req.method === 'PUT'){
        if(!titulo || titulo.trim() === ''){
            return res.status(400).json({ error: 'El título de la tarea es obligatorio y no puede estar vacío.' });
        }

        //limpiar datos 
        if (titulo) req.body.titulo = titulo.trim();
        if (req.body.descripcion){
            req.body.descripcion = req.body.descripcion.trim();
        }
    }
    next();
};

module.exports = {
    validarTareaId,
    validarDatosTarea,
};

