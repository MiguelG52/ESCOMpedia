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