import React, { useContext, useEffect, useRef, useState} from 'react'
import { authContext } from '../../context/authContext';
import { useValidacion } from '../../hooks';
import NavCatalogo from './NavCatalogo';
import "./RegistrarLibro.css";
import { useHistory } from "react-router-dom";
import Footer from '../../components/layout/Footer';
import M from "materialize-css"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { validarCamposCatalogo } from './ValidacionCatalogo';

const STATE_INICIAL = {
    autor: "",
    titulo: "",
    editorial: "",
    year: "",
    tema: "",
    tipo: "general"
}

const RegistrarLibro = ()=> {
    const {firebase,usuario} = useContext(authContext);

    const {Valores, Errores, handleChange, handleSubmit} = useValidacion(STATE_INICIAL,validarCamposCatalogo, registrarLibro);
    const {autor, titulo, editorial, year, tema, tipo} = Valores;
    const imageRef = useRef(null);
    const historial = useHistory();
    const [userType, setUserType] = useState("alumno");
    const [userId, setUserId] = useState("");
    const [validateImage, setValidateImage] = useState("");

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
        if(imageRef.current.files[0]){
            setValidateImage(true)
            const storage = firebase.getStorage();
            const image = imageRef.current.files[0];
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "stated_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref("images").child(image.name).getDownloadURL().then(url => {
                        firebase.regLibro(titulo, autor, editorial, year, tema, tipo, url);
                        historial.push("/catalogo")
                    });
                }
            )
        }else{
            setValidateImage(false);
        }


        
    }

    return (
        <>
        <NavCatalogo/>
			
        <div className="container">
		
        <form onSubmit={handleSubmit} className="formRegistrarLibro">
			<div className="row">
                <div className="col s12 center">
                    <h4>Registra un libro</h4>
                </div>
                <div className="input-field col s12 l6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                            <i className="material-icons prefix colorIcon iconLeft">account_circle</i>
                            <input type="text" id="autor" name="autor" value={autor} onChange={handleChange} placeholder="Autor"/>
                        </div>
                    </div>
                </div>

                <div className="input-field col s12 l6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon iconLeft">Title</i>
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} placeholder="Titulo" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s12 l6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon iconLeft">bookmark</i>
                            <input type="text" id="editorial" name="editorial" value={editorial} onChange={handleChange} placeholder="Editorial" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s12 l6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                            <i className="material-icons prefix colorIcon iconLeft">access_time</i>
                            <input type="number" id="year" name="year" value={year} onChange={handleChange} placeholder="Año" />
                        </div>
                    </div>
                </div>

                <div className="input-field col s12 l6">
                    <div className="blue-text text-darken-2">
                        <div className="center-align">
                        <i className="material-icons prefix colorIcon iconLeft">book</i>
                            <input type="text" id="tema" name="tema" value={tema} onChange={handleChange} placeholder="Tema" />
                        </div>
                    </div>
                </div>
                <div className="input-field col s12 l6">
                <i className="material-icons prefix colorIcon iconLeft">group</i>
                    <select name="tipo" id="tipo" value={tipo} onChange={handleChange} >
                        <option value="general">General</option>
                        {userType==="profesor" ||userType==="administrador"?(<option value="profesor">Profesor</option>):""}
                    </select>
                </div>
                

                <div className="file-field input-field col s12">
                    <div className="btn colorSubmit">
                        <span>Imagen de libro</span>
                        <input type="file" name="imagen" id="imagen" ref={imageRef} placeholder="imagen" accept="image/png, image/jpeg" />
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
        
        {Object.entries(Errores).map(error => (
            <div key={error[0]}className="pink accent-4 center white-text">{error[1]}</div>
        ))} 

        {validateImage===false?<div className="pink accent-4 center white-text">La imagen es obligatoria</div>:""}
       
    </div>
			
            <Footer></Footer>
        </>
    );
}

export default RegistrarLibro;
