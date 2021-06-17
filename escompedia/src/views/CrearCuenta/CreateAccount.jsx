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

<div className="card-panel indigo darken-4">
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
					 </div>
					
				
					
                {Errores.nombre && <p>{Errores.nombre}</p> }
				
				<div className="input-field col s6">
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
					
					</div>
					
				
                {Errores.email && <p>{Errores.email}</p> }
					
					<div className="input-field col s6">
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
						
					</div>
                {Errores.escuela && <p>{Errores.escuela}</p> }
                
					<div class="input-field col s6">
				
                <i className="fas fa-user prefix"></i>
						
					<Input 
                    label="Contraseña"
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
                {Errores.pass && <p>{Errores.pass}</p> }
                {error && <p>{error}</p>}
				
				<div className="center-align">
                <button className="btn waves-effect waves-light">Crear Cuenta</button>
				</div>
            </form>
        </div>

		

    )
}

export default CreateAccount
