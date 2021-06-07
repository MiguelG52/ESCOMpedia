import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";

const Libro = ()=>{
    const { bookId } = useParams(); //Obtiene el id del libro desde los parametros de la url
    const {firebase} = useContext(authContext); 
    const libroRef = firebase.getDocument("Libros", bookId);
    const [libro, loading, error] = useDocumentData(libroRef); //Obtiene los datos de un documento
    // const {titulo, autor, year, editorial} = libro
    console.log(libro);

    if(loading){
        return <div>Loading...</div>
    }

    return(
        <main>
            {libro && (
                <div>
                <h1>Titulo: {libro.titulo}</h1>
                <p>Autor: {libro.autor}</p>
                <p>Año: {libro.year}</p>
                <p>Editorial: {libro.editorial}</p>
                </div>
                )
            }
        </main>
    )
}

export default Libro;