import React, {Fragment, useContext} from 'react';
import Nav from './Nav';
import Search from './Search';
import {Link} from 'react-router-dom';
import './styles.css';
import {authContext} from '../../context/authContext';
import 'materialize-css/dist/css/materialize.min.css'
import './Headercss.css'
import logo from "./escompedia.PNG"

const Header = () => {

    const {usuario, firebase} = useContext(authContext);
    return (
        <header className="row flexx">
            <div className ="col l1.5">
                <div className="header-logo">
                    <p> <img src={logo} alt="logotipo"/></p>
                </div>
            </div>  

            <div className ="col l4">
                 <Search/>
            </div>

            <div className ="col l5.5">
                    <Nav/>
            </div>
            
            <div className ="col l3 center">           
                <div className="header-login">
                    {usuario ? (
                        <Fragment>
                            <p>Hola: {usuario.displayName }</p>
                            <button type="button" onClick={() => firebase.logout()}>Cerrar sesión</button>
                        </Fragment>
                    ):(
						<nav className="nav-wrapper blue darken-1">
                        <Fragment>
							
                        <Link to = '/iniciaSesion'>Iniciar Sesión</Link>
							
                         <Link to = '/registrarse'> Crear Cuenta</Link>
								
                        </Fragment>
							
							</nav>
                    )}
                </div>
            </div>
        </header>           


    )
}

export default Header
