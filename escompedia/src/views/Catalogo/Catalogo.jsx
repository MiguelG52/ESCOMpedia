import NavCatalogo from "./NavCatalogo";
import "./estilosCatalogo.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { authContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import Footer from "../../components/layout/Footer";



const Catalogo = ({tipo})=>{
    const {firebase, usuario} = useContext(authContext);
    const librosRef = firebase.getCollection("Libros");
    const librosQuery = librosRef.where("tipo", "==", tipo);
    const [libros, loading] = useCollectionData(librosQuery, {idField: "id"});

    const [userId, setUserId] = useState("");
    useEffect(() => {
      if(usuario){
        if(usuario.uid){
          const {uid} = usuario;
          setUserId(uid);
        }
      }
    }, [usuario])

    const usuarioRef = firebase.getCollection("Usuarios");
    const usuarioQuery = usuarioRef.where("id", "==", userId);
    const [usuarioFirebase, loadingUser] = useCollectionData(usuarioQuery, {idField: "id"});

    if(loading || loadingUser){    
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
    return( 
    <>
    <NavCatalogo/>
    <div className="row container">
        <div className="col l12 m8 s12">
          <h2 className="center black-text">{tipo==="general"?"De todos los editores":"Hechos por los profesores"}</h2>
        </div>
    </div>
       
    <div className="row container">
            {libros &&
               libros.map (({autor, titulo, id, url}) => (
                <div className="row col l3 m6 s12" key={id}> 
                 <div className="card">
                     <div className="card-image">
                     <img src={url} alt="imagen de muestra" className="imageBook"/>
                     </div>
                    <div className="card-content">
                        <span className="card-title indigo-text text-darken-4 center Titulo">{titulo}</span>                                   
                        <h6>Autor: {autor} </h6>
                    </div>
                    <div className="card-action">
                    <Link className="indigo-text text-darken-4" to={`/libro/${id}`}>Detalles {usuarioFirebase.tipo}</Link>
                    </div>
                    {usuarioFirebase[0].tipo==="administrador"?(
                       <div className="card-action">
                       <Link className="indigo-text text-darken-4" to={`/editar/${id}`}>Editar</Link>
                       </div>
                    ):""}
                </div> 
              </div>))
            }      
    </div>
        <Footer />
    </>
    );
}

export default Catalogo;