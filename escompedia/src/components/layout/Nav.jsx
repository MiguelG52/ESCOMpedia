import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Routes from '../../routes'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'
import { authContext } from '../../context/authContext'

const Nav = () => {
    const {routeIndex, routeBibliotecas, routeForo, routePerfil, routeCatalogo} = Routes
    return (
        	<nav className="nav-wrapper indigo darken-4"> 
			<div className="col l2">
				<Link to={routeIndex}>Inicio</Link>
			</div>
			<div className="col l3">
           		<Link to={routeBibliotecas}>Biblioteca</Link>
			</div>
			<div className="col l2">
           		<Link to={routeForo}>Foro</Link>
			</div>
			<div className="col l2">
            	<Link  to ={routePerfil}>Perfil</Link>
			</div>
			<div className="col l3">
             	<Link  to ={routeCatalogo}>Catálogo</Link>
			</div>
			</nav>





			
    )
}

export default Nav
			
