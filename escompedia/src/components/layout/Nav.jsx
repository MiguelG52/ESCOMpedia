import React from 'react'
import {Link} from 'react-router-dom'
import Routes from '../../routes'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'

const Nav = () => {
    const {routeIndex, routeBibliotecas, routeForo, routePerfil, routeCatalogo} = Routes
    return (
		  
		
		<div className="row">
        <nav className="nav-wrapper blue darken-1">

			 
			<div className="col s6">
				<Link to={routeIndex}>Inicio</Link>
				</div>
				 <div className="col s6">
           <Link   to={routeBibliotecas}>Bibliotecas</Link>
				 </div>
			<div className="col s6">
           <Link  to={routeForo}>Foro</Link>
			</div>
			<div className="col s6">
            <Link  to ={routePerfil}>Perfil</Link>
			</div>
			<div className="col s6">
             <Link  to ={routeCatalogo}>Catálogo</Link>
			</div>

        </nav>
			</div>
			
    )
}

export default Nav
