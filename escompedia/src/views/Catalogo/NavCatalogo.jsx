import "./estilosCatalogo.css";
import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../../routes'

export default function NavCatalogo() {
    const {routeCatalogo, roueteCatalogoProfesores, routeRegistrarLibro} = Routes
    return (
        <nav className="navCatalogo">
            <Link to={routeCatalogo}>Libros</Link>
            <Link to={roueteCatalogoProfesores}>Profesores</Link>
            <Link to={routeRegistrarLibro}>Registrar Libro</Link>
        </nav>
    )
}
