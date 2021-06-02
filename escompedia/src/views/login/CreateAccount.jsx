import React, { useState } from 'react';
import { Input} from '../../components/Input';
import { useHistory } from "react-router-dom";
import validarCrearCuenta from '../../const/validaciones/sign';
import useValidacion from '../../hooks/useValidacion';
import firebase from '../../firebase/Config';


const STATE_INICIAL = {
    nombre: "",
    email: "",
    pass: "",
    escuela: ""
}
const CreateAccount = () => {
    const historial = useHistory();
    const [error, setError] = useState(false);
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
    
    const {nombre, email, escuela, pass} = Valores;

    async function crearCuenta(){
        try{
            await firebase.registrar(nombre, email, escuela, pass);
            historial.push('./')
        }catch(error){
            console.error('Hubo un error al crear el usuario', error.message);
            setError(error.message)
        }
    }

    return (
        <div>
            <h1>Crear Cuenta</h1>
            <form
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
                {Errores.nombre && <p>{Errores.nombre}</p> }
                <Input
                    label="Correo"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nombre@email.com"
                    onChange={handleChange}
                    value={email}
                    
                />
                {Errores.email && <p>{Errores.email}</p> }
                <Input
                    label="Escuela"
                    type="text"
                    id="escuela"
                    name="escuela"
                    placeholder="ESCOM"
                    onChange={handleChange}
                    value={escuela}
                   
                />
                {Errores.escuela && <p>{Errores.escuela}</p> }
                <Input
                    label="Contraseña"
                    type="password"
                    id="pass"
                    name="pass"
                    onChange={handleChange}
                    value={pass}
                    
                />
                {Errores.pass && <p>{Errores.pass}</p> }
                {error && <p>{Error}</p>}
                <button>Crear Cuenta</button>
            </form>
        </div>
    )
}

export default CreateAccount
