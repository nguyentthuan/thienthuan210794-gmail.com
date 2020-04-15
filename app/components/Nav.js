import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Nav extends React.Component{
  render(){
    return (
      <div>
      <nav>
      <ul>
        <li>
          <Link to="/" >HomePage</Link>
        </li>
        <li>
          <Link to="/projects" >Projects</Link>
        </li>
        <li>
          <Link to="/members" >Members</Link>
        </li>
      </ul>
    </nav>
      </div>
    )
  }
}

module.exports = Nav;