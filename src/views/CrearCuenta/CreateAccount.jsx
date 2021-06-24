import React, { useState, useContext} from 'react';
import { Input} from '../../components/Input';
import { useHistory } from "react-router-dom";
import validarCrearCuenta from '../../const/validaciones/sign';
import useValidacion from '../../hooks/useValidacion';
import {authContext} from '../../context/authContext';
import routes from '../../routes'
// import Error from '../../components/error';

const STATE_INICIAL = {
    nombre: "",
    email: "",
    pass: "",
    escuela: "",
    tipo: ""
}
const CreateAccount = () => {
    const {firebase} = useContext(authContext);
    const historial = useHistory();
    const [error, setError] = useState(false);
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
    const {nombre, email, escuela, pass, tipo} = Valores;

    async function crearCuenta(){
        try{
            await firebase.registrar(nombre, email, pass);
            const id = firebase.auth.currentUser.uid;
            await firebase.logout();
            historial.push(routes.routeLoginIn);
            await firebase.regUsuarios(nombre, email, pass, escuela, tipo, id);
        }catch(error){
            setError(error.message)
        }
    }

    console.log(error);

    return (
        <div>
            <div className="card-panel black">
                <div className="white-text">

                    <h3 className="center-align">Crear Cuenta</h3>

                    </div>
                </div>
            <blockquote><h6>¿Aún no estás registrado? Crea una cuenta ahora para ingresar al sistema y disfrutar de las funcionalidades que ofrece.  </h6></blockquote>
            <div className="flex justify-center p-5 m-2">
                <form
                    className="bg-white p-5 shadow-lg"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Input
                        label="Nombre de usuario"
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="JuanGH1999"
                        onChange={handleChange}
                        value={nombre}
                        onBlur={handleBlur}
                    />
                    {Errores.nombre && 
                        <div className="row text-white w-full">
                            <div className="col s4">
                                <p className="card-panel pink accent-4">{Errores.nombre}</p>
                            </div>
                        </div>
                    }
                    <Input
                        label="Correo"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nombre@email.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={email}     
                    />
                    {Errores.email && 
                        <div className="row text-white w-full">
                            <div className="col s4">
                                <p className="card-panel pink accent-4">{Errores.email}</p>
                            </div>
                        </div>
                    }
                    <Input
                        label="Escuela"
                        type="text"
                        id="escuela"
                        name="escuela"
                        placeholder="ESCOM"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={escuela}
                    />
                    {Errores.escuela && 
                        <div className="row text-white w-full">
                            <div className="col s4">
                                <p className="card-panel pink accent-4">{Errores.escuela}</p>
                            </div>
                        </div>
                    }
                    <Input 
                        label="Contraseña"
                        type="password"
                        id="pass"
                        name="pass"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={pass}
                    />{Errores.pass && 
                        <div className="row text-white w-full">
                            <div className="col s4">
                                <p className="card-panel pink accent-4">{Errores.pass}</p>
                            </div>
                        </div>
                    }
                    <div className="p-2 text-sm">
                        <p>Tipo de Usuario (Esta información sera verificada posteriormente)</p>
                        <div>
                            <label className="inline-flex items-center text-black">
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange} 
                                    type="radio" className="form-radio h-4 w-4" name="tipo" value="profesor"/>
                                <span className="ml-2">Profesor</span>
                            </label>
                            <label className="inline-flex items-center text-black">
                                <input
                                    onBlur={handleBlur}
                                    onChange={handleChange} 
                                    type="radio" className="form-radio h-4 w-4" name="tipo" value="alumno"/>
                                <span className="ml-2">Alumno</span>
                            </label>          
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <button className="btn waves-effect waves-light">Crear Cuenta</button>
                    </div>
                </form>
            </div>
			<footer className="page-footer blue accent-4">
                <div className="container">
                    <div className="row">
                    <div className="col l12 s12">
                        <h5 className="white-text">Contacto</h5>
                        <p className="grey-text text-lighten-4">Cualquier duda o comentario puedes enviarla al correo escompedia@gmail.com</p>
                    </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2021 Copyright Text
                    <a className="grey-text text-lighten-4 right" href="https://www.escom.ipn.mx/">ESCOM</a>
                    </div>
                </div>
            </footer>
        </div>

		

    )
}

export default CreateAccount
