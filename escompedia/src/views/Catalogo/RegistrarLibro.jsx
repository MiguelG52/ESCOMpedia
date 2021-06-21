import React, { useContext, useEffect, useRef, useState} from 'react'
import { Input } from '../../components/Input';
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';
import "./RegistrarLibro.css";
import { useHistory } from "react-router-dom";
import Footer from '../../components/layout/Footer';
import M from "materialize-css"
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    const {firebase,usuario} = useContext(authContext);

    const {Valores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos, registrarLibro);
    const {autor, titulo, editorial, year, tema, tipo} = Valores;
    const imageRef = useRef(null);
    const historial = useHistory();
    const [userType, setUserType] = useState("alumno");
    const [userId, setUserId] = useState("");
    
    useEffect(() => {
      if(usuario){
        if(usuario.uid){
          const {uid} = usuario;
          setUserId(uid);
        }
      }
    }, [usuario])

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, "");
    }, [userType])


    const usuarioRef = firebase.getCollection("Usuarios");
    const usuarioQuery = usuarioRef.where("id", "==", userId);
    const [usuarioFirebase, loading] = useCollectionData(usuarioQuery, {idField: "id"});

    if(loading){    
        return <div className="row container">
          <div className="col l12 m12 s12 center"> 
              <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
              <div className="circle"></div>
              </div>
              <div className="gap-patch">
              <div className="circle"></div>
             </div><div className="circle-clipper right">
            <div className="circle"></div>
            </div>
          </div>
        </div>
          </div>
        </div>
    }

        console.log("Tipo usuario: " + usuarioFirebase[0].tipo)
        if(!(usuarioFirebase[0].tipo === userType)){
            setUserType(usuarioFirebase[0].tipo);
        }
      
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
                        {userType==="profesor" ||userType==="administrador"?(<option value="profesor">Profesor</option>):""}
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
