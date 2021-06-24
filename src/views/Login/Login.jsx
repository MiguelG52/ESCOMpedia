import React, { useState} from 'react'
import { Input} from '../../components/Input';
import { useHistory } from "react-router-dom";
import useValidacion from '../../hooks/useValidacion';
import firebase from '../../firebase/Config';
import validarIniciarSesion from '../../const/validaciones/login';
import 'materialize-css/dist/css/materialize.min.css'

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
       <div className="card-panel black">
	<div className="white-text">
            <h3 className="center-align">Iniciar Sesión</h3>
				</div>
			</div>
			
			<blockquote><h6>¿Ya tienes una cuenta? Inicia sesión para acceder a todas las funcionalidades de ESCOMpedia  </h6></blockquote>
            <form
                onSubmit={handleSubmit}
            >
				<div className="row">
					<div className="input-field col s12">
					 <div className="blue-text text-darken-2">
						 <label className="black-text"><h5 className="center-align">Correo</h5></label>
                <Input
                    
                    type="email"
                    placeholder="nombre@email.com"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    onBlur={handleBlur}
                />
						</div>
					</div>
                {Errores.email && 
						<div className="row">
							<div className="col s4">
								<div className="center-align">
						<p className="card-panel pink accent-4">{Errores.email}</p>
								</div>
							</div>
							</div>
								}
					
					<div className="input-field col s12">
					 <div className="blue-text text-darken-2">
						 <label className="black-text"><h5 className="center-align">Contraseña</h5></label>
                <Input
                    
                    type="password"
                    id="pass"
                    name="pass"
                    onChange={handleChange}
                    value={pass}
                    onBlur={handleBlur}
                />
						 
						</div>
					</div>
				</div>
                {Errores.pass &&
					<div className="row">
							<div className="col s4">
					<p className="card-panel pink accent-4">{Errores.pass}</p>
						</div>
							</div>	
								}
                {error && <p>{error}</p>}
				
				<div className="center-align">
                <button className="btn waves-effect waves-light">Iniciar sesion</button>
				</div>
            </form>
			
			
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

export default Login
