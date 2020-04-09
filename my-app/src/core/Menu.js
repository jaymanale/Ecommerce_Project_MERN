import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="nav nav-tabs">
          <li className="nav item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              Cart
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              A.Dashboard
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              Signup
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              Signin
            </Link>
          </li>
          <li className="nav item">
            <Link className="nav-link" to="/">
              Signout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
