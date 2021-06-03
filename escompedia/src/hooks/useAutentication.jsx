import { useState, useEffect } from 'react';
import firebase from '../firebase/Config'

function useAutenticacion(){
    const [UsuarioAutenticado, setUsuarioAutenticado] = useState(null);
    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario){
                setUsuarioAutenticado(usuario);
            }
            else{
                setUsuarioAutenticado(null)
            }
        });
        return () => unsuscribe();
    }, []);
    return UsuarioAutenticado;
}
export default useAutenticacion;