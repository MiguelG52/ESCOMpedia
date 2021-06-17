import React from 'react'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'

const Search = () => {
    return (
        	<nav className="nav-wrapper blue darken-1"> 
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
