import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UseridContext } from './AppContent';
import Logout from './Log/Logout';

const NavBar = () => {
    const userid = useContext(UseridContext)
    const userData = useSelector((state) => state.userReducer)

        return (
        <nav>
            <div className='nav-container'>
                <div className='nav-bar'>
                    <NavLink exact to = "/">
                        <div className='logo'>
                            <img src='./img/icon-left-font.png' alt='icon' />
                        </div>
                    </NavLink>
                </div>
                {userid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink exact to='/profil'>
                                <h4>Bienvenue {userData.pseudo}</h4>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                  <ul>
                    <li></li>
                    <li>
                        <NavLink exact to="/profil">
                        <img className='icon-connect' src='./img/login.png' alt='login' />
                        </NavLink>
                    </li>
                  </ul>  
                )
                }
            </div>
        </nav>
    );
};

export default NavBar;