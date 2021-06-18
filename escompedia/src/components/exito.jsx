import React from 'react'

const Exito = ({descripcion}) => {
    return (
    <div className="flex bg-green-200 p-4">
        <div className="mr-4">
            <div className="h-10 w-10 text-white bg-green-600 rounded-full flex justify-center items-center">
                <i className="material-icons">done</i>
            </div>
        </div>
        <div className="flex justify-between w-full">
            <div className="text-green-600">
            <p className="mb-2 font-bold">
                Exito
            </p>
            <p className="text-xs">
                {descripcion}
            </p>
            </div>
        </div>
    </div>
    )
}

export default Exito