import {useState, useEffect} from 'react'

const useValidacion = (estadoInicial, validar, fn) => {
    const [Valores, setValores] = useState(estadoInicial)
    /*Si falla la validacion se llenara este objeto*/
    const [Errores, setErrores] = useState({})
    /*Si el state cambia a true, se enviara el formulario*/
    const [SubmitForm, setSubmitForm] = useState(false)
    
    useEffect(() => {
        if(SubmitForm){
            /*Verificamos si el objeto esta vacio y creamos una variable de errores*/
            const noErrores = Object.keys(Errores).length === 0;
            /* si no hay errores se ejecuta la funcion que viene en el parametro */
            if(noErrores){
                fn();
            }
            setSubmitForm(false);
        }
    }, [Errores, SubmitForm, fn]);

    const handleChange = (e) => setValores({...Valores, [e.target.name] : e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(Valores);
        setErrores(erroresValidacion)
        setSubmitForm(true);
    }
    const handleBlur = () =>{
        const erroresValidacion = validar(Valores);
        setErrores(erroresValidacion)
    }

    return{
        Valores, Errores, handleChange, handleSubmit, handleBlur, setValores
    };
}

export default useValidacion;
