import React, { useContext, useRef } from 'react'
import { authContext } from '../../context/authContext';
import NavCatalogo from './NavCatalogo';

const RegistrarLibro = ()=> {
    const {firebase} = useContext(authContext);

    const autorRef = useRef(null);
    const tituloRef = useRef(null);
    const editorialRef = useRef(null);
    const yearRef = useRef(null);
    const temaRef = useRef(null);
    const tipoRef = useRef(null)

    const regLib =(event)=>{
        event.preventDefault();
        //Se registra el libro en firebase
        const titulo = tituloRef.current.value;
        const autor = autorRef.current.value;
        const editorial = editorialRef.current.value;
        const year = yearRef.current.value;
        const tema = temaRef.current.value;
        const tipo = tipoRef.current.value;
        firebase.regLibro(titulo, autor, editorial, year, tema, tipo);
    }

    return (
        <>
        <NavCatalogo/>
        <form onSubmit={regLib}>
            <label htmlFor="autor">Autor</label>
            <input type="text" id="autor" name="autor" ref={autorRef}/>
            <label htmlFor="titulo">Titulo</label>
            <input type="text" id="titulo" name="titulo" ref={tituloRef}/>
            <label htmlFor="editorial">Editorial</label>
            <input type="text" id="editorial" name="editorial" ref={editorialRef}/>
            <label htmlFor="year">Año</label>
            <input type="number" name="year" id="year" ref={yearRef}/>
            <label htmlFor="tema">Tema</label>
            <input type="text" id="tema" name="tema" ref={temaRef}/>
            <label htmlFor="tipo">Tipo</label>
            <select name="tipo" id="select" defaultValue={"general"} ref={tipoRef} >
                <option value="general">General</option>
                <option value="profesor">Profesor</option>
            </select>
            <input type="submit" value="Registrar"/>
        </form> 
        </>
    );
}

export default RegistrarLibro;
