import React, { useEffect } from 'react'
import "./estiloInicio.css";
import 'materialize-css/dist/css/materialize.min.css'
import sl1 from './Slide1.jpg';
import sl2 from './Slide2.jpg';
import sl3 from './Slide3.jpg';
import sl4 from './Slide4.jpg';
import sl5 from './Slide5.jpg';
import M from "materialize-css"


const Index = () => {

  useEffect(() => {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {
      indicators: false,
      interval: 3000,
      height: 500
    });
    M.AutoInit();
    var parallax = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(parallax);

  }, [])

    return (
    <>
     <div className="slider">
        <ul className="slides">
          <li>
            <img src={sl1} alt="slide1"/> 
            <div className="caption center-align">
              <h1>LIBROS MAS CONSULTADOS</h1>
              <h4 className="light grey-text text-lighten-3">Aqui tienes lo mas visto hoy</h4>
            </div>
          </li>
          <li>
            <img src={sl3} alt="slide2"/> 
            <div className="caption right-align">
              <h1>ECUACIONES DIFERENCIALES</h1>
              <h5 className="light grey-text text-lighten-3"> Si tienes problemas en mate, checa nuestros libros de ecuaciones </h5>
            </div>
          </li>
          <li>
          <img src={sl4} alt="slide3"/> 
            <div className="caption left-align">
              <h1>PROGRAMACION EN C</h1>
              <h5 className="light grey-text text-lighten-3">Nada como un buen libro para aprender uno de los lenguajes mas usados del mundo</h5>
            </div>
          </li>
          <li>
          <img src={sl2} alt="slide4"/> 
            <div className="caption right-align">
              <h1>SISTEMAS OPERATIVOS</h1>
              <h5 className="light grey-text text-lighten-3">Aprende los origenes de las computadoras modernas</h5>
            </div>
          </li>
          <li>
          <img src={sl5} alt="slide5" /> 
            <div className="caption left-align">
              <h1>ADMINISTRACION FINANCIERA</h1>
              <h5 className="light grey-text text-lighten-3">Conviertete en el mejor haciendo balanzas de comprobacion</h5>
            </div>
          </li>
        </ul>
      </div>
 
    <div className="black white-text center">
        <div className="container">
            <div className="section">
            <h2 className="light grey-text text-lighten-3">Bienvenido a ESCOMPEDIA</h2>
            <p className="light grey-text text-lighten-3"> Reseña, forma parte de un foro y consulta libros </p>
        </div>
    </div>
    </div>

  <div>
  <div className="row container section">
        <div className="col l5">
		       <div className="card-panel blue lighten-3">
            <h5>Realiza reseñas</h5>
		        <p>¿Conoces algun libro referente a tus estudios universitarios? Buscalo o súbelo al sistema para realizar una reseña y permitir que otros usuarios puedan conocer acerca del mismo.</p>
		        </div>
        </div>
      <div className="col l7">
		    <div className="card-panel deep-purple lighten-3">
         <h5>Usa el foro para discutir sobre un libro</h5>
		     <p>ESCOMPEDIA cuenta con un foro, el cual permite a varios usuarios discutir sobre algun libro, utilízalo para comunicarte con otros usuarios y escojer el mejor libro dependiendo de tu especialidad.</p>
        </div>
			</div>		
      <div className="col l12">
		    <div className="card-panel red lighten-3">
          <h5>Realiza bibliotecas</h5>
		      <p>Utiliza el espacio de bibliotecas para guardar los libros que más sean de tu interés.</p>
				</div>
		  </div>
    </div>
  </div >

           
			<footer className="page-footer blue accent-4">
          <div className="container">
            <div className="row">
              <div className="col l12 s12">
                <h5 className="white-text">Contacto</h5>
                <p className="grey-text text-lighten-4">Cualquier duda o comentario puede enviarla al correo ejemplo@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
                © 2021 Copyright Text
            <a className="grey-text text-lighten-4 right" href="https://www.escom.ipn.mx/">ESCOM</a>
            </div>
          </div>
      </footer>
    </>
    )
  }

export default Index;