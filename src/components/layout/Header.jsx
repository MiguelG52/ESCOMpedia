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
        <header className="row">
            <div className ="col m1 l1 imageContainer">
                <div className="header-logo">
                    <p> <img src={logo} alt="logotipo"/></p>
                </div>
            </div>  

            <div className ="col s12 m12 l3 searchContainer">
                 <Search/>
            </div>

            <div className ="col s12 m7 l5 navContainer">
                    <Nav/>
            </div>
            
            <div className ="col s12 l3 m5 center nameContainer">           
                <div className="header-login">
                    {usuario ? (
                        <Fragment>
                            <nav className="nav-wrapper indigo darken-4">
                            <div className="col s6">
                            <p>Hola {usuario.displayName }</p>
                            </div>
                            <div className="col s6">
                            <button type="button" onClick={() => firebase.logout()}>Cerrar sesión</button>
                            </div>
                            </nav>
                        </Fragment>
                    ):(
						<nav className="nav-wrapper indigo darken-4 l3">
                        <Fragment>
                            <div className="col s6">
                            <Link to = '/iniciaSesion'>Iniciar Sesión</Link>
                            </div>
                            <div className="col s6">
                            <Link to = '/registrarse'> Crear Cuenta</Link>
                            </div>
                        </Fragment>
							</nav>
                    )}
                </div>
            </div>
        </header>           


    )
}

export default Header
