import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
  <Link 
                className="navbar-brand" 
                to="/"
            >
                System 
            </Link>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
      <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/add"
                    >
                        Add Student
                    </NavLink>
      </li>
      <li class="nav-item">
      <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/list"
                    >
                        List Student
                    </NavLink>
      </li>
      <li class="nav-item">
      <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/login"
                    >
                        Logout
                    </NavLink>
      </li>
      

      
    </ul>
  </div>


  {/* <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/login"
                    >
                        Logout
                    </NavLink>
                </ul>
            </div>*/}
</nav>


        
    )
}