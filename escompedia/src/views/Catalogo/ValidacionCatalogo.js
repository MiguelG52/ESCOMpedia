
const validarCamposCatalogo = (valores) =>{
    let errores = {};
    const regexLetras = /^[a-zA-z\-\s]{1,25}$/; //De 1 a 25 letras
    const regexAlfanumerico = /^[\w\-\s]{1,25}$/;//De 1 a 25 carcateres alfanumericos
    
    if(!regexLetras.test(valores.autor)) errores.autor = "El autor debe ser maximo de 25 letras";
    if(!regexAlfanumerico.test(valores.titulo)) errores.titulo = "El titulo debe ser maximo de 25 caracteres alfanumericos";
    if(!regexLetras.test(valores.editorial)) errores.editorial = "La editorial debe ser maximo de 25 letras";
    if(valores.year < 1400) errores.year = "Ingresa un año valido";
    if(!regexLetras.test(valores.tema)) errores.tema = "El tema debe ser maximo de 25 letras";

    if(!valores.autor) errores.autor = "El autor es obligatorio";
    if(!valores.titulo) errores.autor = "El titulo es obligatorio"
    if(!valores.editorial) errores.autor = "La editorial es obligatoria"
    if(!valores.tema) errores.autor = "El tema es obligatorio"

    return errores;
}

export {validarCamposCatalogo};