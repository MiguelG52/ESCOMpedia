import NavCatalogo from "./NavCatalogo";
import "./estilosCatalogo.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { authContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Catalogo = ({tipo})=>{
    const {firebase} = useContext(authContext);
    const librosRef = firebase.getCollection("Libros");
    const librosQuery = librosRef.where("tipo", "==", tipo);
    const [libros, loading, error] = useCollectionData(librosQuery, {idField: "id"});

    if(loading){
        return <div>Loading...</div>
    }

    return(
        <>
        <NavCatalogo/>
        <h1>{tipo}</h1>
        <main className="libros">
            {libros &&
             libros.map(({autor, titulo, id}) => (
                 <div className="libro" key={id}>
                     <h2>{titulo}</h2>
                     <p>Autor: {autor}</p>
                     <Link to={`/libro/${id}`}>Detalles</Link>
                 </div>
             ))   
            }
        </main>
        </>
    );
}

export default Catalogo;