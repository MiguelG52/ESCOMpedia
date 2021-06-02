import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/layout/Header';
import Routes from './routes'
import Views from './views'
import { FirebaseProvider } from './context/FirebaseContext';


function App() {
  /* Extraemos layout y views desde objeto Routes y Views*/
  const {routeIndex, routeBibliotecas, routeForo, routePerfil, routeSignIn} = Routes
  const {viewIndex, SignIn} = Views
  return (
      <FirebaseProvider>
        <Router>
          <Header/>
          <Switch>
            <Route exact path={routeIndex} component={viewIndex}/>
            <Route exact path={routeBibliotecas}/>
            <Route exact path={routeForo}/>
            <Route exact path={routePerfil}/>
            <Route exact path={routeSignIn} component={SignIn}/>
          </Switch>
        </Router>
      </FirebaseProvider>
  );
}

export default App;
