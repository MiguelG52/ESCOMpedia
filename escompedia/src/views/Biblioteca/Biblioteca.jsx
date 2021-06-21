// import FormBiblioteca from "./FormBiblioteca"
import "./Biblioteca.css"
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
// import M from "materialize-css"

const Biblioteca = ()=>{
    //-------------------Por cuestiones de tiempo solo se podra tener una----------------
    // const [bibliotecaCollection, setBibliotecaCollection] = useState("")
    // useEffect(() => {
    //     if(usuario){
    //         setBibliotecaCollection(firebase.getCollection(`Bibliotecas/${usuario.displayName}/misBibliotecas`));
    //     }
    // }, [usuario]);
    // const [bibliotecas, loading] = useCollectionData(bibliotecaCollection, {idField: "id"});
    // useEffect(() => {
    //     var elems = document.querySelectorAll('select');
    //     M.FormSelect.init(elems, "");
    // }, [bibliotecas]);
    // const [bibliotecaName, setBibliotecaName] = useState("");
    // const changeBiblioteca = (event) => {
    //     console.log(event.target.value);
    //     setBibliotecaName(event.target.value);
    // }
    const {firebase, usuario} = useContext(authContext);
    const librosRef = firebase.getCollection("Libros");
    const [libros, loading] = useCollectionData(librosRef, {idField: "id"});

    
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
           {/* <FormBiblioteca /> Por cuestiones de tiempo solo se podra tener una*/}
        <div className="black">
            <div className="s12">
                <h2 className="center white-text ">Tu biblioteca</h2>
            </div>
        </div>

        <div className="row container">
            {libros &&
                libros.map(({ autor, titulo, id, url, InBibliotecaOf }) => (
                    InBibliotecaOf.includes(usuario.displayName)?(
                    <div className="row col l3 m6 s12" key={id}>
                        <div className="card">
                            <div className="card-image">
                                <img src={url} alt="imagen de muestra" className="imageBook" />
                            </div>
                            <div className="card-content">
                                <span className="card-title indigo-text text-darken-4 center Titulo">{titulo}</span>
                                <h6>Autor: {autor} </h6>
                            </div>
                            <div className="card-action">
                                <Link className="indigo-text text-darken-4" to={`/libro/${id}`}>Detalles</Link>
                            </div>
                        </div>
                    </div>):""))
            }
        </div>
        </>
    )
}

export default Biblioteca;