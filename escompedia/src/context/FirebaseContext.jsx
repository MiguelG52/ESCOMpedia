import { createContext } from 'react';
import firebase from '../firebase/Config'

export const FirebaseContext = createContext();
export const FirebaseProvider = ({children}) => {
    return(
        <FirebaseContext.Provider
            value={{firebase}}
        >
            {children}
        </FirebaseContext.Provider>
    );  
}
