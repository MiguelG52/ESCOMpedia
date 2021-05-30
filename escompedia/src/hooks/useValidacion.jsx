import React, {useState, useEffect} from 'react'

const useValidacion = (initialState, validar, fn) => {
    const [Valores, setValores] = useState(initialState)
    /*Si falla la validacion se llenara este objeto*/
    const [Errores, setErrores] = useState({})
    /*Si el state cambia a true, se enviara el formulario*/
    const [SubmitForm, setSubmitForm] = useState(false)
    
    useEffect(() => {
        if(SubmitForm){
            /*Verificamos si el objeto esta vacio y creamos una variable de errores*/
            const noErrores = Object.keys.length === 0;
            /* si no hay errores se ejecuta la funcion que viene en el parametro */
            if(noErrores){
                fn();
            }
            setSubmitForm(false);
        }
    }, []);

    const handleChange = (e) => setValores({...Valores, [e.tarjet.name] : e.tarjet.value})

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(Valores);
        setErrores(erroresValidacion)
        setSubmitForm(SubmitForm);
    }

    return(
        Valores, Errores, SubmitForm, handleChange, handleSubmit
    );
}

export default useValidacion
