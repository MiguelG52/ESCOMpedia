import React, { useContext, useRef} from 'react'
import { Input } from '../../components/Input';
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';
import "./RegistrarLibro.css";
import { useHistory } from "react-router-dom";

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
    const imageRef = useRef(null);
    const historial = useHistory();

    function registrarLibro (){
        const storage = firebase.getStorage();
        const image = imageRef.current.files[0];
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "stated_changed",
            snapshot =>{},
            error =>{
                console.log(error);
            },
            ()=>{
                storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                    firebase.regLibro(titulo, autor, editorial, year, tema, tipo, url);
                    historial.push("/catalogo")
                });
            }
        )
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

        <div>
          <input type="file" name="imagen" id="imagen" ref={imageRef} placeholder="imagen" />
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
          <div className="container">
            <div className="row">
              <div className="col l12 s12">
                <h5 className="white-text">Contacto</h5>
                <p className="grey-text text-lighten-4">Cualquier duda o comentario puedes enviarla al correo escompedia@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
                © 2021 Copyright Text
            <a className="grey-text text-lighten-4 right" href="https://www.escom.ipn.mx/">ESCOM</a>
            </div>
          </div>
</footer>
        </>
    );
}

export default RegistrarLibro;
