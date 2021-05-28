import React from 'react'
import {Link} from 'react-router-dom'
import Routes from '../../routes'
import './styles.css'

const Nav = () => {
    const {routeIndex, routeBibliotecas, routeForo, routePerfil} = Routes
    return (
        <nav className="header-nav">
            <Link to={routeIndex}>Inicio</Link>
            <Link to={routeBibliotecas}>Bibliotecas</Link>
            <Link to={routeForo}>Foro</Link>
            <Link to ={routePerfil}>Perfil</Link>
        </nav>
    )
}

export default Nav
