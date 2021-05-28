import React from 'react'
import './styles.css'

const Buscar = () => {
    return (
        <form>
            <input type="text" placeholder="¿buscas algun libro?"/>
            <button className="button-search">Buscar</button>
        </form>
    )
}

export default Buscar
