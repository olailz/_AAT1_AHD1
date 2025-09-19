const express = require('express');
const router = express.Router();

//Importamos los controladores
const {
    getTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
} = require('../controllers/tareasController');

//Importamos el middleware de validación
const {
    validarTareaId,
    validarDatosTarea
} = require('../middleware/validators');

//Ruta Get /api/tareas - Obtener todas las tareas   
router.get('/', getTareas);

//Ruta Get /api/tareas/id
router.get('/:id', validarTareaId, getTareaById);

//Ruta POST /api/tareas
router.post('/', validarDatosTarea, createTarea);

//ruta PUT /api/tareas/id
router.put('/:id', validarTareaId, updateTarea);

//ruta DELETE /api/tareas/id
router.delete('/:id', validarTareaId, deleteTarea);

module.exports = router;


