import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <img className="logo" src={Logo} alt="" />
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/instruction'>Instructions</Link></li>
                  
                </ul>
            </nav>
            <div className="menu">

            </div>
        </div>
    )
}

export default Navbar
