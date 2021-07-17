import React, {useState, useEffect} from 'react';

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import PrivateRoute from "./Route/PrivateRoute";
import firebase from "./Utils/firebase";

import Home from "./Pages/HOME";
import LOGIN from "./Pages/LOGIN";
import ArtPost from "./Pages/ArtPost";
import SENTM from "./Pages/SentM";
import SENTC from "./Pages/SentC";

export default function App() {
const [state, setState] = useState({
  isAuth: false,
  isLoading: true
})
useEffect(() => {
  
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      setState({isAuth: true, isLoading: false})
    }else{
      setState({isAuth: false, isLoading: false})
    }
  });
}, [])

  return (
    <div>
      <Router>
        <Switch>
          
          <Route path="/" exact>
            <Redirect to="/LOGIN" />
          </Route>

          <Route path="/LOGIN" component={LOGIN} />

          <PrivateRoute component={Home} isAuth={state.isAuth} path="/HOME" />
          <PrivateRoute component={ArtPost} isAuth={state.isAuth} path="/ArtPost" />
          <PrivateRoute component={SENTM} isAuth={state.isAuth} path="/SentM" />
          <PrivateRoute component={SENTC} isAuth={state.isAuth} path="/SentC" />
        
        </Switch>
      </Router>
      
    </div>
  )
}

