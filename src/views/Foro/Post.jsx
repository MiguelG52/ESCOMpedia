import React,{useContext} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link, withRouter } from 'react-router-dom';
import { authContext } from '../../context/authContext';

function Post({elemento, id}){
    
    const{firebase} = useContext(authContext);
    const usuariosCollection = firebase.getCollection("Usuarios");
    const query = usuariosCollection.where("id", "==", id);
    const [user, loading] = useCollectionData(query, {idField: "id"});

    console.log(user);
    console.log(loading);

    return (
            <div className="rounded-lg shadow-lg w-full p-2  m-2 flex items-center gap-4 border">
                <div className="bg-green-500 h-20 w-20 flex items-center justify-center rounded-full">
                       
                </div>
                <div>
                    <h3 className="text-3xl text-blue-500 hover:blue-500"><Link to={`/foro/post/${elemento.id}`}>{elemento.titulo}</Link></h3>
                    <div className="text-lg text-gray-500">
                        <div className="flex gap-5">
                            <p>Autor: {elemento.usuario}</p>
                            <p>likes:{elemento.votos}</p>
                            <p>Comentarios:{elemento.comentarios.length}</p> 
                        </div>
                    </div>
                </div>
            </div>
        
    );  
}

export default withRouter(Post);