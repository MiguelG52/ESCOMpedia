import React, { useState } from 'react'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'


const Search = () => {
    
	const [Buscar, setBuscar] = useState('')
	return (
        	<nav className="nav-wrapper indigo darken-4"> 
      		<form>
        		<div className="input-field">
          			<input id="search" type="search" required placeholder="¿Buscas algun libro?"/>
          			<label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
          			<i className="material-icons">close</i>
        		</div>
      		</form>
			</nav>
		
				
    )
}

export default Search
