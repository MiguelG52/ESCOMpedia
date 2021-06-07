import React, {Fragment, useContext} from 'react';
import Nav from './Nav';
import Search from './Search';
import {Link} from 'react-router-dom';
import './styles.css';
import {authContext} from '../../context/authContext';

const Header = () => {

    const {usuario, firebase} = useContext(authContext);
    return (
        <header>
            <div className ="header">
                <div className="header-logo">
                    <p>Escompedia.jpg</p>
                    <Search/>
                    <Nav/>
                </div>
                <div className="header-login">
                    {usuario ? (
                        <Fragment>
                            <p>Hola: {usuario.displayName }</p>
                            <button type="button" onClick={() => firebase.logout()}>Cerrar sesión</button>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Link to = '/iniciaSesion'>Iniciar Sesión</Link>
                         <Link to = '/registrarse'>Crear Cuenta</Link>
                        </Fragment>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
