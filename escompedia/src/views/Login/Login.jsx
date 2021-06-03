import React, { useState} from 'react'
import { Input} from '../../components/Input';
import { useHistory } from "react-router-dom";
import useValidacion from '../../hooks/useValidacion';
import firebase from '../../firebase/Config';
import validarIniciarSesion from '../../const/validaciones/login';

const STATE_INICIAL = {
    email: "",
    pass: "",
}

const Login = () => {
    const historial = useHistory();
    async function iniciarSesion(){
        try{
            const usuario = await firebase.login(email, pass);
            console.log(usuario)
            historial.push('/');
        }catch(error){
            console.error("Hubo un error al autenticar al usuario", error.message);
            setError(error.message)
        }
    }
    const [error, setError] = useState(false);
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
    const {email, pass} = Valores;
    return (
        <div>
            <h2>Inicia Sesión</h2>
            <form
                onSubmit={handleSubmit}
            >
                <Input
                    label="Correo"
                    type="email"
                    placeholder="nombre@email.com"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    onBlur={handleBlur}
                />
                {Errores.email && <p>{Errores.email}</p>}
                <Input
                    label="Contraseña"
                    type="password"
                    id="pass"
                    name="pass"
                    onChange={handleChange}
                    value={pass}
                    onBlur={handleBlur}
                />
                {Errores.pass && <p>{Errores.pass}</p>}
                {error && <p>{error}</p>}
                <button>Iniciar sesion</button>
            </form>
        </div>
    )
}

export default Login
