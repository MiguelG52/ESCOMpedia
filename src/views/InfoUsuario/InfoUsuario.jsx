import { useContext } from "react";
import Footer from "../../components/layout/Footer";
import { authContext } from "../../context/authContext";
import Perfil from './Perfil';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

const InfoUsuario = ()=>{
	const {firebase} = useContext(authContext);
    const usuariosCollection = firebase.getCollection("Usuarios");
	const {id} = useParams();
	const query = usuariosCollection.where("id", "==", id);
	const [user, loading] = useCollectionData(query, {idField: "id"});

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
        <main>
			<div className="card-panel black">
				<div className="white-text">
            		<h2 className="center-align">Información del Usuario</h2>
				</div>
			</div>
			{user && user.map(({index,descripcion, escuela, fecha, nombre,trabajo, ubicacion, id, url}) =>{
				fecha = fecha.toDate().toString();
				return(
					<div key={index}>
							<Perfil
							nombre={nombre}
							descripcion={descripcion}
							escuela={escuela}
							fecha={fecha}
							trabajo={trabajo}
							ubicacion={ubicacion}
							id={id}
							url={url}
							/>
					</div>
				)
			})}
			<Footer/>
        </main>
    );
}

export default InfoUsuario;