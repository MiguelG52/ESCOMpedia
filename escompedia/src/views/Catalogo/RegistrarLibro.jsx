import React, { useContext} from 'react'
import { Input } from '../../components/Input';
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';
import "./RegistrarLibro.css";

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
			
        <div className="container">
		
        <form onSubmit={handleSubmit}>
			<div className="row">
				<div className="input-field col s6">
					<div className="blue-text text-darken-2">
						<div className="center-align">
						 <label className="black-text"><h5>Autor</h5></label>
            <Input type="text" id="autor" name="autor" value={autor} onChange={handleChange} onBlur={handleBlur} placeholder="autor"/>
					</div>
						</div>
					</div>
				
				<div className="input-field col s6">
					<div className="blue-text text-darken-2">
						<div className="center-align">
						 <label className="black-text"><h5>Título</h5></label>
            <Input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} onBlur={handleBlur} placeholder="titulo"/>
					</div>
					</div>
				</div>
				
				<div className="input-field col s6">
					<div className="blue-text text-darken-2">
						<div className="center-align">
						 <label className="black-text"><h5>Editorial</h5></label>
            <Input type="text" id="editorial" name="editorial" value={editorial} onChange={handleChange} onBlur={handleBlur} placeholder="editorial"/>
					</div>
					</div>
				</div>
				
				<div className="input-field col s6">
					<div className="blue-text text-darken-2">
						<div className="center-align">
						 <label className="black-text"><h5>Año</h5></label>
            <Input type="number" id="year" name="year" value={year} onChange={handleChange} onBlur={handleBlur} placeholder="Año"/>
					</div>
					</div>
				</div>
				
				<div className="input-field col s12">
					<div className="blue-text text-darken-2">
						<div className="center-align">
						 <label className="black-text"><h5>Tema</h5></label>
            <Input type="text" id="tema" name="tema" value={tema} onChange={handleChange} onBlur={handleBlur} placeholder="tema"/>
					</div>
					</div>
				</div>
				
            <select name="tipo" id="tipo" value={tipo} onChange={handleChange} onBlur={handleBlur} >
                <option value="general">General</option>
                <option value="profesor">Profesor</option>
            </select>
				</div>
            <div className="center">
            <button className="btn waves-effect waves-light" type="submit" id="Registrar" name="Registrar">Registrar</button>  
            </div>
        </form> 
        </div>
			<footer className="page-footer blue accent-4">
          <div class="container">
            <div class="row">
              <div class="col l12 s12">
                <h5 class="white-text">Contacto</h5>
                <p class="grey-text text-lighten-4">Cualquier duda o comentario puedes enviarla al correo escompedia@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
                © 2021 Copyright Text
            <a class="grey-text text-lighten-4 right" href="https://www.escom.ipn.mx/">ESCOM</a>
            </div>
          </div>
</footer>
        </>
    );
}

export default RegistrarLibro;
