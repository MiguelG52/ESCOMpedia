import React, { useContext} from 'react'
import { Input } from '../../components/Input';
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';

const STATE_INICIAL = {
    autor: "",
    titulo: "",
    editorial: "",
    year: "",
    tema: "",
    tipo: "general"
}

const validarCampos = (valores) =>{
    let errores = {};
    //Valida review
    // if(!valores.review) errores.review = "La reseña es obligatoria";
    return errores
}

const RegistrarLibro = ()=> {
    const {firebase} = useContext(authContext);

    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos, registrarLibro);
    const {autor, titulo, editorial, year, tema, tipo} = Valores;

    function registrarLibro (){
        firebase.regLibro(titulo, autor, editorial, year, tema, tipo);
    }


    return (
        <>
        <NavCatalogo/>
        <form onSubmit={handleSubmit}>
            <Input type="text" id="autor" name="autor" value={autor} onChange={handleChange} onBlur={handleBlur} placeholder="autor"/>
            <Input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} onBlur={handleBlur} placeholder="titulo"/>
            <Input type="text" id="editorial" name="editorial" value={editorial} onChange={handleChange} onBlur={handleBlur} placeholder="editorial"/>
            <Input type="number" id="year" name="year" value={year} onChange={handleChange} onBlur={handleBlur} placeholder="year"/>
            <Input type="text" id="tema" name="tema" value={tema} onChange={handleChange} onBlur={handleBlur} placeholder="tema"/>
            <select name="tipo" id="tipo" value={tipo} onChange={handleChange} onBlur={handleBlur} >
                <option value="general">General</option>
                <option value="profesor">Profesor</option>
            </select>
            <Input type="submit" id="Registrar" name="Registrar" value="Registrar"/>  
        </form> 
        </>
    );
}

export default RegistrarLibro;
