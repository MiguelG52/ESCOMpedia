import React, { useContext, useEffect, useRef} from 'react'
import { Input } from '../../components/Input';
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';
import "./RegistrarLibro.css";
import { useHistory } from "react-router-dom";
import Footer from '../../components/layout/Footer';
import M from "materialize-css"

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

    const {Valores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos, registrarLibro);
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

    useEffect(() => {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems, "");
    }, [])

    return (
        <>
        <NavCatalogo/>
			
        <div className="container">
		
        <form onSubmit={handleSubmit} className="formRegistrarLibro">
			<div className="row">
                <div className="col l12 center">
                    <h4>Registra un libro</h4>
                </div>
                <div className="input-field col s6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon">account_circle</i>
                            <input type="text" id="autor" name="autor" value={autor} onChange={handleChange} onBlur={handleBlur} placeholder="Autor"/>
                        </div>
                    </div>
                </div>

                <div className="input-field col s6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon">Title</i>
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} onBlur={handleBlur} placeholder="Titulo" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon">bookmark</i>
                            <input type="text" id="editorial" name="editorial" value={editorial} onChange={handleChange} onBlur={handleBlur} placeholder="Editorial" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                            <i className="material-icons prefix colorIcon iconLeft">access_time</i>
                            <input type="number" id="year" name="year" value={year} onChange={handleChange} onBlur={handleBlur} placeholder="Año" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon">book</i>
                            <input type="text" id="tema" name="tema" value={tema} onChange={handleChange} onBlur={handleBlur} placeholder="Tema" />
                        </div>
                    </div>
                </div>
                <div className="input-field col s6">
                <i className="material-icons prefix colorIcon">group</i>
                    <select name="tipo" id="tipo" value={tipo} onChange={handleChange} onBlur={handleBlur} >
                        <option value="general">General</option>
                        <option value="profesor">Profesor</option>
                    </select>
                </div>
                

                <div className="file-field input-field col s12">
                    <div className="btn colorSubmit">
                        <span>Imagen de libro</span>
                        <input type="file" name="imagen" id="imagen" ref={imageRef} placeholder="imagen" />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

            </div>
            <div className="center">
                <button className="btn waves-effect waves-light colorSubmit" type="submit" id="Registrar" name="Registrar">Registrar</button>
            </div>
        </form>
    </div>
			
            <Footer></Footer>
        </>
    );
}

export default RegistrarLibro;
