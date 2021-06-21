import React, {useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {likeIcon} from '../../assets/index';

const PostAbierto = () => {
    const {firebase, usuario} = useContext(authContext);
    const {id} = useParams();
    const postRef = firebase.getDocument("Foros", id);
    const [post, loading] = useDocumentData(postRef);
    const [Comentario, setComentario] = useState({});
    

    const votar = () =>{
        const Total = post.votos+1;
        if(post.haVotado.includes(id)) return;
        const NuevohanVotado = [...post.haVotado, id];
        firebase.db.collection('Foros').doc(id).update({
            votos:Total,
            haVotado:NuevohanVotado
        })
    }

    //funciones para crear comentarios
    const handleComentario = e =>{
        setComentario({
            ...Comentario,[e.target.name] : e.target.value
        })
    }
    const handleAgregaComentario = e =>{
        e.preventDefault();

        Comentario.usuarioID = id;
        Comentario.usuarioNombre = usuario.displayName;
        const nuevosComentarios = [...post.comentarios, Comentario];
        
        firebase.db.collection("Foros").doc(id).update({
            comentarios:nuevosComentarios
        })

        setComentario({
            ...post.Comentarios, nuevosComentarios
        })
    }
    return (
        <section className="w-screen h-screen bg-white flex justify-center">
            {post && (
                <div className="p-5 w-full md:w-1/2">
                    <div className="rounded-lg shadow-lg w-full p-2 flex items-center gap-4 border">
                        <div className="bg-green-500 h-14 w-14 md:h-20 md:w-20 flex p-5 items-center justify-center rounded-full">
                            <p className="text-xl text-white font-bold md:text-2xl">MG</p>    
                        </div>
                        
                        <div>
                            <h3 className="text-2xl md:text-3xl text-blue-500 hover:blue-500">{post.titulo}</h3>
                            <div className="mt-5 mb-5 text-xl ">
                                <p>{post.descripcion}</p>
                            </div>
                            <div className="text-lg text-gray-500">
                                <div className="md:flex gap-5">
                                    <p>Autor: {post.usuario}</p>
                                    <p>likes:{post.votos}</p>
                                    <p>Comentarios:{post.comentarios.length}</p> 
                                </div>
                                {usuario ? (
                                    <div className="p-2">
                                        <button 
                                            onClick={votar}
                                            className="transform p-2 bg-blue-900 rounded-full hover:scale-110"
                                            >
                                            <img className="w-5" alt={likeIcon} src={likeIcon}/>
                                        </button>
                                    </div>
                                ):null}
                                
                            </div>
                        </div>
                    </div>
                    <div className="border m-2 shadow-lg h-3/4 overflow-y-scroll">
                        {usuario ? (
                            <form
                                onSubmit={handleAgregaComentario}
                            >
                                <fieldset>
                                    <textarea
                                        name="mensaje"
                                        placeholder="Deja un comentario" 
                                        onChange={handleComentario}
                                        className="border shadow-lg h-32 overflow-y-scroll p-5 leading-5">
                                    </textarea>
                                </fieldset>
                                <button className="bg-blue-600 p-2 m-2 rounded-lg text-lg text-white font-semibold">Agregar Comentario</button>
                            </form>
                            
                        ):null}
                        
                        <div>
                            <h3 className="text-xl p-2">Comentarios</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {post.comentarios.map((elemento, index) => {
                                    return(
                                        <div className="bg-gray-200 rounded-lg p-2 m-2" key={index}>
                                            <p className="text-lg">{elemento.usuarioNombre}</p>
                                            <p className="pt-2">{elemento.mensaje}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PostAbierto;