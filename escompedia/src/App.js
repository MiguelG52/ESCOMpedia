import './App.css';
import React, { useContext } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/layout/Header';
import Routes from './routes'
import{CreateAccount, Foro, Login, ForoReglas, ForoAyuda, ForoGeneral, ForoLibros, PostAbierto, Index} from './views'
import { authContext, FirebaseProvider } from './context/authContext';
import Catalogo from './views/Catalogo/Catalogo';
import RegistrarLibro from './views/Catalogo/RegistrarLibro';
import InfoUsuario from './views/InfoUsuario/InfoUsuario';
import Libro from './views/Catalogo/Libro';
import Editar from './views/Catalogo/Editar';
import Biblioteca from './views/Biblioteca/Biblioteca';

function App() {
  
  

  
  const {routeIndex, routeBibliotecas, routeForo, routePerfil, routeSignIn, routeLoginIn, routeCatalogo,
          roueteCatalogoProfesores, routeRegistrarLibro, routeLibro, routeForoReglas, routeForoPost, routeForoAyuda,routeForoGeneral,routeForoLibros,
        routeEditar} = Routes
  return (
      <FirebaseProvider>
        <Router>
          <Header/>
          <Switch>
            <Route exact path={routeIndex} component={Index}/>
            <Route exact path={routeBibliotecas} component={Biblioteca}/>
            <Route exact path={routeForo} component={Foro}/>
            <Route exact path={routePerfil} component={InfoUsuario}/>
            <Route exact path={routeSignIn} component={CreateAccount}/>
            <Route exact path={routeCatalogo} render={()=><Catalogo tipo="general"/>} />
            <Route exact path={roueteCatalogoProfesores} render={()=><Catalogo tipo="profesor"/>}/>
            <Route exact path={routeRegistrarLibro} component={RegistrarLibro}/>
            <Route exact path={routeLibro} component={Libro}/>
            <Route exact path={routeEditar} component={Editar}/>
            <Route exact path={routeLoginIn} component={Login}/>
            <Route exact path={routeForoReglas} render={()=> <ForoReglas/>}/>
            <Route exact path={routeForoAyuda} render={()=> <ForoAyuda/>}/>
            <Route exact path={routeForoGeneral} render={()=> <ForoGeneral/>}/>
            <Route exact path={routeForoLibros} render={()=> <ForoLibros/>}/> 
            <Route exact path={routeForoPost} component={PostAbierto} />
          </Switch>
        </Router>
      </FirebaseProvider>
  );
}

export default App;
