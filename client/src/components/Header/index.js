import React from 'react';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <Link to={"/"} style={{textDecoration: "none"}}><h1>Tech Blog</h1></Link>
                <Navigation/>
            </header>
        </>
    );
};

    export default Header;