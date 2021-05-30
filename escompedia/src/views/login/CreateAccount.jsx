import React from 'react'
import { Input } from '../../components/Input'
import useValidacion from '../../hooks/useValidacion'

const State_Validacion = {
    nombre: '',
    email: '',
    pass: '',
    school: ''
}

const CreateAccount = () => {

    
    return (
        <div>
            <h1>Crear Cuenta</h1>
            <form>
                <Input
                    label="Nombre de usuario"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="EnriqueHG85"
                />
                <Input
                    label="Contraseña"
                    id="pass"
                    name="pass"
                    type="pass"
                    placeholder="Contraseña segura"
                />
                <Input
                    label="Correo Electronico"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nombre@email"
                />
                <Input
                    label="Escuela de procedencia"
                    id="school"
                    name="school"
                    type="text"
                    placeholder="ESCOM"
                />
                <button>Crear Cuenta</button>
            </form>
        </div>
    )
}

export default CreateAccount
