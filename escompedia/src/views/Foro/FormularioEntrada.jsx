import React from 'react'

const FormularioEntrada = ({handleCancelar, handleBlur, handleSubmit, handleChange, Valores, Errores}) => {

    return (
        <div className="absolute w-screen h-screen transition-all ease-in-out duration-600">
            <div className="h-screen w-screen bg-black absolute opacity-80 transition-all ease-in-out duration-300">
            </div>
            <div className="absolute w-screen top-1/4 ">
                <form
                    onSubmit={handleSubmit}    
                >
                    <div className=" heading text-center font-bold text-2xl m-5 text-white">
                        <p>Nueva Entrada</p>
                    </div>
                    <div className=" editor bg-white rounded-lg mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                        <input
                            placeholder="Titulo" 
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="title"
                            name="titulo"
                            value={Valores.titulo}
                            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
 
                        />
                        {Errores.titulo ? <p>{Errores.titulo}</p>:null}
                        <textarea
                            id="descripcion"
                            name="descripcion" 
                            value={Valores.descripcion}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe tu tematica en esta parte!">
                        </textarea>
                        {Errores.descripcion ? <p>{Errores.descripcion}</p>:null}
                        <div className="icons flex text-gray-500 m-2">                    
                            <div className="count ml-auto text-gray-400 text-xs font-semibold">
                                <p>0/300</p>
                            </div>
                        </div>
                        <div className="buttons flex">
                            <button 
                                onClick={handleCancelar}
                                className=" bg-gray-500 hover:bg-gray-800 transition-all ease-in-out duration-300 text-white px-4 font-semibold cursor-pointe ml-auto p-3 rounded-lg">
                                Cancelar
                            </button>
                            <button className=" bg-blue-500 hover:bg-blue-800 transition-all ease-in-out duration-300 text-white p-3 px-4 font-semibold cursor-pointer rounded-lg ml-2">
                                Postear
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioEntrada