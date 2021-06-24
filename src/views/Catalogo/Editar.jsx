import { useContext, useEffect, useRef} from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useHistory, useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useValidacion } from "../../hooks";
import M from "materialize-css";
import NavCatalogo from "./NavCatalogo";
import Footer from "../../components/layout/Footer";
import { validarCamposCatalogo } from "./ValidacionCatalogo";

const STATE_INICIAL = {
    autor: "",
    titulo: "",
    editorial: "",
    year: "",
    tema: "",
    tipo: "general"
}

const Editar = ()=>{
    const { bookId } = useParams(); //Obtiene el id del libro desde los parametros de la url
    const {firebase} = useContext(authContext); 
    const libroRef = firebase.getDocument("Libros", bookId);
    const [libro, loading] = useDocumentDataOnce(libroRef); //Obtiene los datos de un documento

    const {Valores, Errores, handleChange, handleSubmit, setValores} = useValidacion(STATE_INICIAL,validarCamposCatalogo, ()=>{});
    const {autor, titulo, editorial, year, tema, tipo} = Valores;
    const imageRef = useRef(null);
    const historial = useHistory();

    useEffect(() => {
        if(!loading){
            const valoresLibro = {
                autor: libro.autor,
                titulo: libro.titulo,
                editorial: libro.editorial,
                year: libro.year,
                tema: libro.tema,
                tipo: libro.tipo
            }
            setValores(valoresLibro);
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        }
        // eslint-disable-next-line
    }, [loading])
    
    function editarLibro (){
        const noErrores = Object.keys(validarCamposCatalogo(Valores)).length === 0;
        if(noErrores){
            if(imageRef.current.value){
                //Se selecciono imagen
                console.log("Se selecciono imagen en editar")
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
                            firebase.editLibro(titulo, autor, editorial, year, tema, tipo, url, libroRef)
                            historial.push("/catalogo")
                        });
                    }
                )
            }else{
                //No se selecciono imagen
                console.log("No selecciono imagen en editar")
                firebase.editLibro(titulo, autor, editorial, year, tema, tipo, libro.url, libroRef);
                historial.push("/catalogo")
            }
        }
    }

    function eliminarLibro(){
            console.log("Se selecciono Eliminar")
            firebase.deleteLibro(libroRef);
            historial.push("/catalogo");
    }

    return(
        <>
        <NavCatalogo/>
			
        <div className="container">
		
        <form onSubmit={handleSubmit} className="formRegistrarLibro">
			<div className="row">
                <div className="col s12 center">
                    <h4>Edita el libro</h4>
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
                            <i className="material-icons prefix colorIcon iconLeft iconLeft">access_time</i>
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
                        <option value="profesor">Profesor</option>
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
            <div className="buttonsEditar">
                    <button className="btn waves-effect waves-light colorSubmit" type="submit" id="Editar" name="Editar" onClick={editarLibro}>Editar</button>
                    <button className="btn waves-effect waves-light red" type="submit" id="Eliminar" name="Eliminar" onClick={eliminarLibro}>Eliminar</button>
            </div>
            
        </form>

        
        {Object.entries(Errores).map(error => (
            <div key={error[0]}className="pink accent-4 center white-text">{error[1]}</div>
        ))} 

    </div>
			
    <Footer/>
    </>    
    )
}

export default Editar;