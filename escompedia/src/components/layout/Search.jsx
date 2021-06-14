import React from 'react'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'

const Buscar = () => {
    return (
		
		
			
			<nav className="nav-wrapper blue darken-1">
			<div className="container"> 
			
        <form>
			
            <input type="text" placeholder="¿buscas algun libro?"/>
			<div class="button-search">
				<div class="center-align">
            <button className="btn waves-effect waves-light">Buscar</button>
				</div>
				</div>
				
        </form>
			</div>
				</nav>
			
			
			
    )
}

export default Buscar
