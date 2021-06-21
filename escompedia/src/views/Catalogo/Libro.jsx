import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Review from "./review";
import NavCatalogo from "./NavCatalogo";

const Libro = ()=>{
    const { bookId } = useParams(); //Obtiene el id del libro desde los parametros de la url
    const {firebase, usuario} = useContext(authContext); 
    const libroRef = firebase.getDocument("Libros", bookId);
    const [libro, loading] = useDocumentData(libroRef); //Obtiene los datos de un documento
    console.log(libro);

    const addFavorite = ()=>{
        firebase.addBiblioteca(usuario.displayName, bookId);
    }

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
        <main>
            <h2 className="center white-text indigo darken-4">Información del libro</h2>
            {libro && (
                <div className="row container">
                    <div className="card horizontal col s6 offset-s3">
                        <div className="card-image">
                            <img src={libro.url} className="imageBook"/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <span className="card-title">Titulo: {libro.titulo}</span>
                                <span className="card-title">Autor: {libro.autor}</span>
                                <span className="card-title">Año: {libro.year}</span>
                                <span className="card-title">Editorial: {libro.editorial}</span>
                                <span className="card-title">Tema: {libro.tema}</span>
                            </div>
                            {libro.InBibliotecaOf.includes(usuario.displayName)?(
                                <div className="card-action center">
                                    <a className="indigo-text text-darken-4">Ya se encuentra en tu biblioteca!</a>
                                </div>
                            ):(
                                <div className="card-action manita" onClick={addFavorite}>
                                    <a className="indigo-text text-darken-4">Agregar a biblioteca!</a>
                                </div>
                            )

                            }
                            
                        </div>
                    </div>
                </div>
                )
            }
        </main>
        <div className="container">
        <Review bookId={bookId}/>
        </div>
        </>
    )
}

export default Libro;