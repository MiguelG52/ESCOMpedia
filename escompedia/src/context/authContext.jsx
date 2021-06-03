import { createContext } from 'react';
import firebase from '../firebase/Config'
import { useAutenticacion } from '../hooks';

export const authContext = createContext();
export const FirebaseProvider = ({children}) => {
    const usuario = useAutenticacion();
    return(
        <authContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            {children}
        </authContext.Provider>
    );  
}
