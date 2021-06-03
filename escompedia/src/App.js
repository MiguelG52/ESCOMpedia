import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/layout/Header';
import Routes from './routes'
import{ index, CreateAccount, Login } from './views'
import { FirebaseProvider } from './context/authContext';
import { useAutenticacion } from './hooks';


function App() {

  //Se crea hook para verificar si el usuario esta logueado
  const usuario = useAutenticacion();
  console.log(usuario);

  /* Extraemos layout y views desde objeto Routes y Views*/
  const {routeIndex, routeBibliotecas, routeForo, routePerfil, routeSignIn, routeLoginIn} = Routes
  return (
      <FirebaseProvider>
        <Router>
          <Header/>
          <Switch>
            <Route exact path={routeIndex} component={index}/>
            <Route exact path={routeBibliotecas}/>
            <Route exact path={routeForo}/>
            <Route exact path={routePerfil}/>
            <Route exact path={routeSignIn} component={CreateAccount}/>
            <Route exact path={routeLoginIn} component={Login}/>
          </Switch>
        </Router>
      </FirebaseProvider>
  );
}

export default App;
