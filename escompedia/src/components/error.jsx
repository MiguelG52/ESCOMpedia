import React from 'react'

const AlertaError = (descripcion) => {
    return (
        <div className="flex bg-red-200 p-4">
            <div className="mr-4">
                <div className="h-10 w-10 text-white bg-red-600 rounded-full flex justify-center items-center">
                    <i className="material-icons">report</i>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="text-red-600">
                    <p className="mb-2 font-bold">
                        Error
                    </p>
                    <p className="text-xs">
                        {descripcion}
                    </p>
                </div>
                <div className="text-sm text-gray-500">
                    <p>x</p>
                </div>
            </div>
        </div>
    )
}

export default AlertaError