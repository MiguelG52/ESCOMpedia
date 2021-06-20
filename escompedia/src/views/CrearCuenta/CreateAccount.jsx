import React, { useState, useContext} from 'react';
import { Input} from '../../components/Input';
import { useHistory } from "react-router-dom";
import validarCrearCuenta from '../../const/validaciones/sign';
import useValidacion from '../../hooks/useValidacion';
import {authContext} from '../../context/authContext';
import routes from '../../routes'
import "./estiloCrearC.css";
import 'materialize-css/dist/css/materialize.min.css'
//import './App.css'
//import Footer from './components/Footer'


const STATE_INICIAL = {
    nombre: "",
    email: "",
    pass: "",
    escuela: ""
}
const CreateAccount = () => {
    const {firebase} = useContext(authContext);
    const historial = useHistory();
    const [error, setError] = useState(false);
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
    const {nombre, email, escuela, pass} = Valores;

    async function crearCuenta(){
        try{
            await firebase.registrar(nombre, email, pass);
            await firebase.logout();
            historial.push(routes.routeLoginIn);
        }catch(error){
            console.error('Hubo un error al crear el usuario', error.message);
            setError(error.message)
        }
    }

    return (
        <div>

<div className="card-panel black">
	<div className="white-text">

		<h3 className="center-align">Crear Cuenta</h3>

		</div>
	</div>
			
			<blockquote><h6>¿Aún no estás registrado? Crea una cuenta ahora para ingresar al sistema y disfrutar de las funcionalidades que ofrece.  </h6></blockquote>
				
            <form
                onSubmit={handleSubmit}
                noValidate
            >
				
				<div className="row">
				 <div className="input-field col s6">
					 <div className="blue-text text-darken-2">
						 <label className="black-text"><h5>Usuario</h5></label>
                <Input
                    
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="JuanGH1999"
                    onChange={handleChange}
                    value={nombre}
                    onBlur={handleBlur}
                />
						 </div>
					 </div>
					
				
					
                {Errores.nombre && 
						<div className="row">
							<div className="col s4">
						<p className="card-panel pink accent-4">{Errores.nombre}</p>
							</div>
							</div>
				}
				
				<div class="input-field col s6">
					<div className="blue-text text-darken-2">
						 <label className="black-text"><h5>Correo</h5></label>
                <Input
                    
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nombre@email.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={email}     
                />
					
					</div>
					</div>
					
				
                {Errores.email && 
						<div className="row">
							<div className="col s4">
								<p className="card-panel pink accent-4">{Errores.email}</p> 
							</div>
							</div>
								}
					
					<div class="input-field col s6">
						<div className="blue-text text-darken-2">
						 <label className="black-text"><h5>Escuela</h5></label>
                <Input
                    
                    type="text"
                    id="escuela"
                    name="escuela"
                    placeholder="ESCOM"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={escuela}
                />
						</div>	
					</div>
                {Errores.escuela && 
						<div className="row">
							<div className="col s4">
								<p className="card-panel pink accent-4">{Errores.escuela}</p>
							</div>
							</div>
								}
                
					<div class="input-field col s6">
						
				
                <i class="fas fa-user prefix"></i>
						<div className="blue-text text-darken-2">
						 <label className="black-text"><h5>Contraseña</h5></label>
						
					<Input 
                    
                    type="password"
                    id="pass"
                    name="pass"
					class="validate"
					placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={pass}
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
                {error && 
					<div className="row">
							<div className="col s4">
					<p className="card-panel pink accent-4">{error}</p>
						</div>
						</div>
								}
				
				<div className="center-align">
                <button className="btn waves-effect waves-light">Crear Cuenta</button>
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

export default CreateAccount
