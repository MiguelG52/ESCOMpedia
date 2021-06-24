import React, { useContext, useState } from 'react'
import FormularioEntrada from './FormularioEntrada';
import validarTemaNuevoForo from '../../const/validaciones/CreaEntrada';
import { useValidacion } from '../../hooks';
import { authContext } from '../../context/authContext';
import Info from '../../components/info'
import { useCollectionData } from "react-firebase-hooks/firestore";

import Post from './Post';



const State_Inicial={
    titulo: '',
    descripcion:'',
}
const ForoTemplate = ({nombreForo, nombreBaseDeDatos, tipo}) => {
    
    const [Form, setForm] = useState(false);
    const {usuario,firebase} = useContext(authContext); 
    const posts = firebase.getCollection(nombreBaseDeDatos);
    const postsQuery = posts.where("tipo", "==", tipo);
    const [Discusiones, loading] = useCollectionData(postsQuery, {idField: "id"});
	let id = ''
	try{
		id = usuario.uid;
	}catch(error){

	}

    const handleNuevaEntrada = (e) =>{
        e.preventDefault();
        (Form) ? setForm(false):setForm(true);
    }
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(State_Inicial, validarTemaNuevoForo, AgregaEntrada);
    
    function AgregaEntrada(){
        firebase.regDiscusion(nombreBaseDeDatos, Valores.titulo,Valores.descripcion, usuario.displayName, tipo)
        setForm(false);
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

    return (
        <div className="bg-gray-200 h-screen flex flex-col items-center relative">
            {Form ? (
                <FormularioEntrada
                    Valores={Valores}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleBlur={handleBlur}
                    handleCancelar={handleNuevaEntrada}
                    Errores = {Errores}
                    />
            ):null}
            <div className="w-full text-center h-1/6 flex justify-center items-center">
                <h2 className="font-semibold bg-white text-4xl p-4 rounded-lg shadow-lg ">Bienvenido al foro de {nombreForo}</h2>
            </div>
            <div className="h-3/4 flex flex-col md:flex-row w-full p-5 gap-5">
                <section className="md:w-3/4 shadow-lg overflow-y-auto p-5 bg-white rounded-lg ">
                    <div>
                        <h3 className="text-2xl shadow-lg p-5">Ultimos Posts</h3>
                        <div>
                            {Discusiones && Discusiones.map((elemento, index) => {
                                return(
                                    <div className="grid grid-cols-1" key={index}>
                                        <Post
                                            elemento={elemento}
                                            id={id}
                                        />
                                    </div>  
                                )
                            })}   
                        </div>
                    </div> 
                </section>
                <aside className="flex h-1/2 shadow-lg flex-col items-center md:w-1/4 bg-white p-5 rounded-lg   ">
                    {usuario ? (
                      <button 
                        className="bg-blue-500 text-white font-semibold text-xl p-4 rounded-lg hover:bg-blue-800 transition-all ease-in-out duration-300"
                        onClick={handleNuevaEntrada}
                        >Crear Nueva Discusión
                    </button>   
                    ):(
                        <Info descripcion="Inicia Sesión para poder crear una tema de discusion"/>
                    )}
                    <div className="shadow-md p-5 w-full mt-2 flex flex-col items-center">
                        <p>Mejores entradas</p>
                        <div>
                            <p>Entrada1</p>
                            <p>Entrada1</p>
                            <p>Entrada1</p>
                            <p>Entrada1</p>
                            <p>Entrada1</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default ForoTemplate;