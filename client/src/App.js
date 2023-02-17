import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Boutiques from './Boutiques/Boutiques';
import './App.css';
import Produits from './Produits/Produits';
import Categories from './Categories/Categories';
import Login from './Auth/Login';
import  RouteLinks from './Routes/RouteLinks';
import PrivateRoute from './Routes/PrivateRoutes.js';

function App() {
  return (
    <Router>
      <RouteLinks path='/' exact component={Login} /> 
      <PrivateRoute path='/boutiques' exact component={Boutiques}/>
      <PrivateRoute path='/produits/:id' exact component={Produits}/>
      <PrivateRoute path='/categories/:id' exact component={Categories}/>
    </Router> 
  );
}

export default App;
