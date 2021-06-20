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
        this.storage = firebase.storage();
    }
    async registrar(nombre, email, pass){
        
        //Registra usuario
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, pass);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        });
    }
    //Inicia sesion con usuario
    async login(email, pass){
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    //Cierra sesion
    async logout(){
        await this.auth.signOut();
    }
    //registrar libro
    regLibro(titulo, autor, editorial, year, tema, tipo, url){
        const libros = this.db.collection("Libros");
        libros.add({
            titulo,
            autor, 
            editorial,
            year,
            tema, 
            tipo,
            url
        })
    }

    //Edita un libro
    editLibro(titulo, autor, editorial, year, tema, tipo, url, libroRef){
        libroRef.update({
            titulo,
            autor, 
            editorial,
            year,
            tema, 
            tipo,
            url
        });
    }

    //Elimina un libto
    deleteLibro(libroRef){
        libroRef.delete();
    }

    //registrar reseña
    async regReview(idBook, autor, text, calificacion){
        const reviews = this.db.collection("Reviews");
        await reviews.add({
            idBook,
            autor,
            text,
            calificacion,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    //Obetener la referencia de alguna coleccion
    getCollection(collection){
        const ref = this.db.collection(collection);
        return ref;
    }

    //Obtener la referencia a algun documento (de alguna coleccion)
    getDocument(idCollection, idDocument){
        const docRef = this.db.collection(idCollection).doc(idDocument);
        return docRef;
    }

    //Subir imagen
    getStorage(){
        return this.storage;
    }
     //Registra Entrada de Foro
     async regDiscusion(nombreBaseDeDatos, titulo,descripcion, usuario, tipo){
        const entrada = this.db.collection(nombreBaseDeDatos);
        await entrada.add({
            usuario,
            tipo,
            titulo,
            descripcion, 
            votos:0,
            comentarios: [],
            fecha: firebase.firestore.FieldValue.serverTimestamp(),
            haVotado:[]
        })
    }
}

export default new Firebase();
