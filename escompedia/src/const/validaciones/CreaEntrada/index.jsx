export default function validarTemaNuevoForo(valores){
    let errores = {};
    if(!valores.titulo) errores.titulo = "El titulo es obligatorio";
    
    if(!valores.descripcion) errores.descripcion = "La descripcion de la discusion es obligatorio";
    else if(valores.descripcion.length < 10) errores.descripcion = "La descripcion debe ser mayor a 10 caracteres";
    
    return errores;
}