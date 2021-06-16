import React from 'react'
import './styles.css'
import 'materialize-css/dist/css/materialize.min.css'

const Search = () => {
    return (
		

        	<nav className="nav-wrapper blue darken-1"> 
      		<form>
        		<div class="input-field">
          			<input id="search" type="search" required placeholder="¿Buscas algun libro?"/>
          			<label class="label-icon" for="search"><i class="material-icons">search</i></label>
          			<i class="material-icons">close</i>
        		</div>
      		</form>
			</nav>
		
				
    )
}

export default Search
