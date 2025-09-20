const mongoose = require('mongoose')


//Middleware para validar ObJectId de MongoDB
const validarTareaId = (req, res, next) => {
    const id = (req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
             error: 'El ID de la tarea debe ser un número válido.' });
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

const deleteTarea = async (req, res) => {
    try {
        const tareaEliminada = await eliminarTarea(req.tareaId); // 🔹 req.tareaId
        if (!tareaEliminada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ mensaje: 'Tarea eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
}

module.exports = {
    validarTareaId,
    validarDatosTarea,
    deleteTarea
};

