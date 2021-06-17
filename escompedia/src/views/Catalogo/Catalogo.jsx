import NavCatalogo from "./NavCatalogo";
import "./estilosCatalogo.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { authContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';



const Catalogo = ({tipo})=>{
    const {firebase} = useContext(authContext);
    const librosRef = firebase.getCollection("Libros");
    const librosQuery = librosRef.where("tipo", "==", tipo);
    const [libros, loading] = useCollectionData(librosQuery, {idField: "id"});

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

    return( 
    <>
    <NavCatalogo/>

    <div className="row container">
        <div className="col l12 m8 s12">
          <h2 className="PonerCapital center white-text"> <i> {tipo} </i></h2>
        </div>
    </div>
       
    <div className="row container">
            {libros &&
               libros.map (({autor, titulo, id, url}) => (
                <div className="row col l4 m6 s12" key={id}> 
                 <div className="card">
                     <div className="card-image">
                     <img src={url} alt="imagen de muestra"/>
                     </div>
                    <div className="card-content">
                        <span className="card-title blue-text Titulo">{titulo}</span>                                   
                        <h6>Autor: {autor} </h6>
                    </div>
                    <div className="card-action">
                    <Link className="blue-text" to={`/libro/${id}`}>Detalles</Link>
                    </div>
                </div> </div>))
            }      
    </div>

<footer className="page-footer blue accent-4">
          <div className="container">
            <div className="row">
              <div className="col l12 s12">
                <h5 className="white-text">Contacto</h5>
                <p className="grey-text text-lighten-4">Cualquier duda o comentario puede enviarla al correo escompedia@gmail.com</p>
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

export default Catalogo;