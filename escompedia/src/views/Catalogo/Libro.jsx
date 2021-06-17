import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Review from "./review";

const Libro = ()=>{
    const { bookId } = useParams(); //Obtiene el id del libro desde los parametros de la url
    const {firebase} = useContext(authContext); 
    const libroRef = firebase.getDocument("Libros", bookId);
    const [libro, loading] = useDocumentData(libroRef); //Obtiene los datos de un documento
    console.log(libro);

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
        <main>
        <div className="row container">
            <div className="col l12 m8 s12">
                <h2 className="center white-text"> <i> Informacion del titulo </i></h2>
            </div>
        </div>

            {libro && (
                <div className="row container">
                    <div className="col l8 m8 s12">
                        <div className="card">
                        <div className="card-content">
                            <span className="card-title">Titulo: {libro.titulo}</span>
                            <h6>Autor: {libro.autor}</h6>
                            <h6>Año: {libro.year}</h6>
                            <h6>Editorial: {libro.editorial}</h6>
                        </div>
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