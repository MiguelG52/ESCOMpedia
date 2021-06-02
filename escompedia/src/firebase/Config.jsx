import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const Config = {
    apiKey: "AIzaSyDWOv1FL-jCxyeFj2N8AI4G5Dv3GvtSZ3c",
    authDomain: "escompedia-74d8e.firebaseapp.com",
    projectId: "escompedia-74d8e",
    storageBucket: "escompedia-74d8e.appspot.com",
    messagingSenderId: "899164786999",
    appId: "1:899164786999:web:1675d586176c56279f4ab2"
};

class Firebase{
    constructor(){
        firebase.initializeApp(Config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }
    async registrar(nombre, email, escuela, pass){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, pass);

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }
}

export default new Firebase();
