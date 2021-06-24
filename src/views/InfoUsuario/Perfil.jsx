import React, { useContext, useRef, useState } from "react";
import { jobIcon, schoolIcon, editText} from "../../assets";
import { authContext } from "../../context/authContext";

export default function Profile({descripcion, escuela, fecha, nombre,trabajo, ubicacion, id, url}) {
    
    const {firebase} = useContext(authContext);
    const [editUbicacion, seteditUbicacion] = useState(false);
    const [EditEmppleo, setEditEmppleo] = useState(false);
    const [EditDescripcion, setEditDescripcion] = useState(false)
    const [Comentario,setComentario] = useState("");
    const [Comentario2,setComentario2] = useState("");
    const [Comentario3,setComentario3] = useState("");
    const imageRef = useRef(null);


    const subeImg = (e) => {

        // imageRef.current.files[0];
        
        
    }
    console.log(url);
    const handleClickUbicacion = () => {
        editUbicacion ? seteditUbicacion(false): seteditUbicacion(true)
        if(Comentario.length === 0) setComentario("Editar Ubicacion");
        else{
            firebase.db.collection('Usuarios').doc(id).update({
                ubicacion:Comentario
            })
        }
    }
    const handleClickEmpleo = () => {
        EditEmppleo ? setEditEmppleo(false):setEditEmppleo(true);
        if(Comentario2.length === 0) setComentario2("Añade un empleo");
        else{
            firebase.db.collection('Usuarios').doc(id).update({
                trabajo:Comentario2
            })
        }
    }
    const handleClickDescripcion = () => {
        EditDescripcion ? setEditDescripcion(false):setEditDescripcion(true);
        if(Comentario3.length === 0) setComentario3("Añade una descripción");
        else{
            firebase.db.collection('Usuarios').doc(id).update({
                descripcion:Comentario3
            })
        }
    }
    
    const handleChangeU = (e) =>{
        e.preventDefault();
        setComentario(e.target.value);
    }
    const handleChangeT = (e) =>{
        e.preventDefault();
        setComentario2(e.target.value);
    }
    const handleChangeD = (e) =>{
        e.preventDefault();
        setComentario3(e.target.value);
    }
    
    
    return (
        <>
        <main className="profile-page">
            <section className="relative block" style={{ height: "500px" }}>
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
                }}
            >
                <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
                ></span>
            </div>
            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                style={{ height: "70px" }}
            >
                <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
                >
                <polygon
                    className="text-gray-300 fill-current"
                    points="2560 0 2560 100 0 100"
                ></polygon>
                </svg>
            </div>
            </section>
            <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative flex justify-center">
                            <img
                                alt="..."
                                src={url}
                                className="shadow-xl h-32 w-32 rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                
                            />
                            <div>
                            <input className="mt-28" ref={imageRef} type="file" id="img" name="img" placeholder="foto" onChange={subeImg}/>

                        </div>
                        
                    
                    </div>

                    </div>
                    </div>
                    <div className="text-center mt-10">
                    <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                        {nombre}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                        {ubicacion}

                        <div>
                            <button
                                onClick={handleClickUbicacion}
                            >
                                <img className={`transform w-6 hover:scale-110`} src={editText} alt={editText}/>
                            </button>
                            {editUbicacion ? (<input onChange={handleChangeU} name="Comentario" value={Comentario} className="w-1/2"/>):null}
                        </div>

                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                        <div className="flex items-center justify-center gap-3">
                            <img className="h-6" alt={jobIcon} src={jobIcon}/>
                            {trabajo}
                        </div>
                        <div>
                            <button
                                onClick={handleClickEmpleo}
                            >
                                <img className={`transform w-6 hover:scale-110`} src={editText} alt={editText}/>
                            </button>
                            {EditEmppleo ? (<input onChange={handleChangeT} name="Comentario2" value={Comentario2}className="w-1/2"/>):null}
                        </div>
                    </div>
                    <div className="mb-2 text-gray-700 flex gap-3 items-center justify-center">
                        <img className="h-6"alt={schoolIcon} src={schoolIcon}/>
                        {escuela}
                        
                    </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4 mb-4">
                            <p className="text-lg leading-relaxed text-gray-800">
                                {descripcion}
                            </p>
                            <div>
                                <button
                                    onClick={handleClickDescripcion}
                                >
                                    <img className={`transform w-6 hover:scale-110`} src={editText} alt={editText}/>
                                </button>
                                {EditDescripcion ? (<input  onChange={handleChangeD} value={Comentario3} name="Comentario3" className="w-1/2 overflow-y-scroll"/>):null}
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 text-gray-700">
                        Mienmbro desde: {fecha}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </main>
        </>
    );
}