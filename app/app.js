var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from "react-redux";
import { createStore } from 'redux';
var createHistory =require("history").createBrowserHistory;

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


import store from './store.js';

//import '../resources/scss/style.scss';


var Members = require('./components/Members.js');
var HomePage = require('./components/HomePage.js');
var Main = require('./components/Main.js');
var Nav = require('./components/Nav.js');
var Projects = require('./components/Projects.js');



// var username = (state = null, action) => {
//   switch (action.type) {
//     case 'LOG_IN':
//       return action.username;
//     case 'LOG_OUT':
//       return null;
//     default:
//       return state;
//   }
// }
//var reducer = redux.combineReducers({username});
//var store = createStore(username);




ReactDOM.render(
  
  <Provider  store={store} >
  <Router >
      <div>
        <Main/>
        <Nav/>
    
        <Switch>
          <Route path="/projects" >
           <Projects />
          </Route>
          <Route path="/members">
            <Members />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>  
  </Provider> 
  
  ,
  document.getElementById('root')
);

