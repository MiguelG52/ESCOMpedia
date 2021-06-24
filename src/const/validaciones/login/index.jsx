export default function validarIniciarSesion(valores){
    let errores = {};
    //Validar nombre del usuario
  
    if(!valores.email) errores.email = "El email es obligatorio";
    else if(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "Email no valido"
    }
    //Valdia la contraseña
    if(!valores.pass) errores.pass = "El password es obligatorio"
    else if( valores.pass.length < 6) errores.pass = "La contraseña debe ser de al menos 6 caracteres"
    
    return errores
}