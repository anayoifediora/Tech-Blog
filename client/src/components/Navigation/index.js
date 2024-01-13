import React from "react";
import { Link } from 'react-router-dom';

import Auth from "../../utils/auth";

const Navigation = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/')
    };

    return (
        <>
           {Auth.loggedIn() ? ( 
            <ul className="menu">
                
                <li><Link className="nav-link" to ={'/'}>Home</Link></li>
                <li><Link className="nav-link" to = {'/dashboard'}>Dashboard</Link></li>
                {/* <li><Link className="nav-link">Subscribe</Link></li> */}
                <li><Link className="nav-link" onClick={logout}>Log out</Link></li>
                
            </ul>  ) : (
            <ul className="menu">
                
                <li><Link className="nav-link" to ={'/'}>Home</Link></li>
                {/* <li><Link className="nav-link" to = {'/dashboard'}>Dashboard</Link></li> */}
                <li><Link className="nav-link" to ={'/login'}>Login</Link></li>
                <li><Link className="nav-link" to = {'/signup'}>SignUp</Link></li>
                             
            </ul>
            )}
        </>
    );
}



export default Navigation;