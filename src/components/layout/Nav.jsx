import React, { useContext} from 'react'
import {Link} from 'react-router-dom'
import Routes from '../../routes'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'
import { authContext } from '../../context/authContext'


const Nav = () => {
    const {routeIndex, routeBibliotecas, routeForo, routeCatalogo} = Routes
	const {usuario} = useContext(authContext);
	let id = ''
	try{
		id = usuario.uid;
	}catch(error){

	}
	return (
        	<nav className="nav-wrapper indigo darken-4"> 
			<div className="col s2">
				<Link to={routeIndex}>Inicio</Link>
			</div>
			{usuario ? (
				<div className="col s3">
				<Link to={routeBibliotecas}>Bibliotecas</Link>
				 </div>
			):null}
			<div className="col s2">
           		<Link to={routeForo}>Foro</Link>
			</div>
			{usuario ? (
				<div className="col s2">
            		<Link  to ={`/perfil/${id}`}>Perfil</Link>
				</div>
			):null}
			{usuario ? (
				<div className="col s3">
				<Link  to ={routeCatalogo}>Catálogo</Link>
		   		</div>
			): null}
			</nav>
    )
}

export default Nav
			

			
