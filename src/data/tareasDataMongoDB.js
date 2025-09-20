/* require('dotenv').config();  */
const mongo = require('mongoose');

//Definir el esquema de tareas

const tareasSchema = new mongo.Schema({
    /* id:{ type: Number, require:true}, */
    titulo:{type:String, require:true},
    descripcion: {type:String, require:false},
    completada: {type: Boolean, default: false},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion:{type: Date, default: Date.now}
});

//Crear el modelo y exportarlo

const Tareas = mongo.model('tareas', tareasSchema);

//Conexión a MongoDB
const conectarDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_CONNECTION;

        await mongo.connect(MONGODB_URI, {
            dbName: process.env.DB_NAME
        });

        console.log(`Conectado a MongoDB`);
    } catch (error) {
        console.error(`Error de conexión a MongoDB`, error.message);
    }
}

//funcion para obtener todas las tareas

const obtenerTodasLasTareas = async () => {
    try{
        return await Tareas.find().sort({fechaCreacion: -1})    
    }
    catch(error){
        console.error('Error obtenido tareas: ', error.message);
    }   
};

    //funcion para obtener tareas por ID
    const obtenerTareaPorId = async(id) => {
        try{
            return await Tareas.findById(id);
        }
        catch (error){
            console.error('Error obtenido tareas por id: ',  error.message);
        }
    };

    //funcion para crear nueva tarea

    const crearTarea = async (tareaData) => {
        try{
            const nuevaTarea = new Tareas(tareaData);
            return await nuevaTarea.save();
        }
        catch(error){
           console.error('Error crearndpo tareas: ',  error.message);
        } 
};
    

//Funcion para actualizar tarea
const actualizarTarea = async (id, nuevosDatos) => {
    try{
        return await Tareas.findByIdAndUpdate(
            id,
            {
                ...nuevosDatos, 
                fechaActualizacion: new Date()
            },
            { new: true} //Devuelve el documento actualizado
        );
    }
    catch (error){
        console.error('Error actualizando tareas por id: ', error.message);
        throw error;
    }
};

//Función para eliminar tareas
const eliminarTarea = async (id) => {
    try{
        return await Tareas.findByIdAndDelete(id);
    }
    catch (error){
        console.error('Error actualizando tareas por id: ', error.message); 
    }
};


//Exportacion de module
module.exports = {
  conectarDB,
  Tareas,
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};