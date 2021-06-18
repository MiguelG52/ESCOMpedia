import React from 'react'

const Info = ({descripcion}) => {
    return (
        <div className="flex bg-blue-200 p-4 rounded-lg">
            <div className="mr-4">
                <div className="h-10 w-10 text-white bg-blue-600 rounded-full flex justify-center items-center">
                    <p className="">?</p>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="text-blue-600">
                    <p className="mb-2 font-bold">
                        Información
                    </p>
                    <p className="text-xs">
                        {descripcion}
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Info