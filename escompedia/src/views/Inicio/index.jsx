import React from 'react'
import "./estiloInicio.css";
import 'materialize-css/dist/css/materialize.min.css'

const index = () => {
    return (
        <main>
 <div>
  

          <li>
            <div className="card-panel indigo darken-4"> 
            <div className="caption center-align">
              <h1 className="light grey-text text-lighten-3">BIENVENIDO A ESCOMPEDIA</h1>
              <h4 className="light grey-text text-lighten-3"> Reseña, forma parte de un foro y consulta libros </h4>
            </div>
			  </div>
          </li>
          
    </div>
			<div className="row">
				<div className="center-align">

      <div className="col s4">
		  <div className="card-panel blue lighten-3">
        <h4>Realiza reseñas</h4>
		  <br/>
		  <p>¿Conoces algun libro referente a tus estudios universitarios? Buscalo o súbelo al sistema para realizar una reseña y permitir que otros usuarios puedan conocer acerca del mismo.</p>
		  </div>
      </div>
      <div className="col s4">
		  <div className="card-panel deep-purple lighten-3">
        <h4>Utiliza la sección de foros para discutir sobre algun libro</h4>
		  <p>ESCOMPEDIA cuenta con un foro, el cual permite a varios usuarios discutir sobre algun libro, utilízalo para comunicarte con otros usuarios y escojer el mejor libro dependiendo de tu especialidad.</p>
      </div>
					</div>
					
      <div className="col s4">
		  <div className="card-panel red lighten-3">
        <h4>Realiza bibliotecas</h4>
		  <p>Utiliza el espacio de bibliotecas para guardar los libros que más sean de tu interés.</p>
						</div>
						</div>

    </div>
				</div>
           
        </main>
    )
}

export default index
