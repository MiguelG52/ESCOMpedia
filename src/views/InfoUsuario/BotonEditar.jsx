import React from 'react'
const BotonEditar = ({img, width, state, fn}) => {
    
    return (
        <div>
            <button>
                <img className={`transform w-${width} hover:scale-110`} src={img} alt={img}/>
            </button>
        </div>
    )
}

export default BotonEditar
