//Base de datos en memoria
let tareas = [
    {
        id: 1,
        titulo: 'Aprender HTML',
        descripcion: "Estudiar los findamentos del HMTL",
        completada: false,
        fechaCreacion: new Date('2025-09-02'), //formato fecha yymmdd
        fechaActualizacion: new Date('2025-09-02'), //formato fecha yymmdd       
    },      
    {
        id: 2,
        titulo: 'Aprender CSS', 
        descripcion: "Estudiar los findamentos del CSS",
        completada: false,
        fechaCreacion: new Date('2025-09-02'), //formato fecha yymmdd
        fechaActualizacion: new Date('2025-09-02'), //formato fecha yymmdd
    },
    {
        id: 3,  
        titulo: 'Aprender JavaScript',
        descripcion: "Estudiar los findamentos del JavaScript",
        completada: false,
        fechaCreacion: new Date('2025-09-02'), //formato fecha yymmdd
        fechaActualizacion: new Date('2025-09-02'), //formato fecha yymmdd
    }    
];

let nextId = 4;

//Función para obtener todas las tareas
const obtenerTodasLasTareas = () => tareas;

//Función para obtener una tarea por su ID
const obtenerTareaPorId = (id) => tareas.find(t => t.id === id);

//Función para agregar una nueva tarea
const crearTarea = (tareaData) => {
    const nuevaTarea = {
        id: nextId++,   
        ...tareaData,// operador spread para copiar las propiedades de tareaData
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

//Función para actualizar una tarea existente
const actualizarTarea = (id, nuevosDatos) => {
    const index = tareas.findIndex(tarea => tarea.id === id);
    if (index !== -1) return null;
    tareas[index] = {
        ...tareas[index],   
        ...nuevosDatos,
        fechaActualizacion: new Date(),
    };
    return tareas[index];
};

//Función para eliminar una tarea por su ID 
const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return null;

    return tareas.splice(index, 1)[0];
};

//Exportar las funciones para usarlas en otros módulos
module.exports = {
    obtenerTodasLasTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
};