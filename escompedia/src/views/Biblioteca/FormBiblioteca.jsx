import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { useValidacion } from "../../hooks";

const STATE_INICIAL = {
    biblioteca: ""
}

const validarCampos = (valores) =>{
    let errores = {};
    //Valida review
    return errores
}

const FormBiblioteca = ()=>{
    const {Valores, Errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL,validarCampos,crearBiblioteca);
    const {biblioteca} = Valores;
    const {firebase, usuario} = useContext(authContext);

    function crearBiblioteca (){
        console.log("crea biblioteca: " + biblioteca)
        firebase.createBiblioteca(usuario.displayName,biblioteca);
    }

    return (
        <form onSubmit={handleSubmit} >
            <h5 className="center-align">Crea tu biblioteca</h5>
            <div className="row container">
                <div className="input-field col s10">
                    <div className="center-align">
                        <i className="material-icons prefix colorIcon iconLeft">book</i>
                        <input type="text" id="biblioteca" name="biblioteca" placeholder="Biblioteca" onChange={handleChange} onBlur={handleBlur} value={biblioteca} />
                    </div>
                </div>
                <div className="input-field col s2">
                    <button className="btn waves-effect waves-light colorSubmit" type="submit" id="enviar" name="enviar">Crear biblioteca </button>
                </div>
            </div>
        </form>
    )
}

export default FormBiblioteca;