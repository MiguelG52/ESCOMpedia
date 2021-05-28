import React, {Fragment, useState} from 'react'
import Nav from './Nav'
import Search from './Search'
import {Link} from 'react-router-dom'
import './styles.css'

const Header = () => {
    const [Usuario, setUsuario] = useState(false)

    return (
        <header>
            <div className ="header">
                <div className="header-logo">
                    <p>Escompedia.jpg</p>
                    <Search/>
                    <Nav/>
                </div>
                <div className="header-login">
                    {Usuario ? (
                        <Fragment>
                            <p>Hola: Miguel</p>
                            <button type="button">Cerrar sesión</button>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Link to = '/'>Iniciar Sesión</Link>
                        <Link to = '/'>Crear Cuenta</Link>
                        </Fragment>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
