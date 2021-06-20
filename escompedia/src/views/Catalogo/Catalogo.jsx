import NavCatalogo from "./NavCatalogo";
import "./estilosCatalogo.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { authContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import Footer from "../../components/layout/Footer";



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
          <h2 className="PonerCapital center black-text">{tipo}</h2>
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
                    <Link className="indigo-text text-darken-4" to={`/libro/${id}`}>Detalles</Link>
                    </div>
                </div> </div>))
            }      
    </div>
        <Footer />
    </>
    );
}

export default Catalogo;