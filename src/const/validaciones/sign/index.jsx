export default function validarCrearCuenta(valores){
    let errores = {};
    //Validar nombre del usuario
    if(!valores.nombre) errores.nombre = "El nombre es obligatorio"
    //Valida el email
    if(!valores.email) errores.email = "El email es obligatorio";
    else if(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "Email no valido"
    }
    //Valida la escuela
    if(!valores.escuela) errores.escuela = "Le escuela es obligatoria"
    //Valdia la contraseña
    if(!valores.pass) errores.pass = "El password es obligatorio"
    else if( valores.pass.length < 6) errores.pass = "La contraseña debe ser de al menos 6 caracteres"
    
    return errores
}