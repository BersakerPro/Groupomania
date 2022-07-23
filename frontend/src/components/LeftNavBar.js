import React from 'react';
import { NavLink } from 'react-router-dom'

const LeftNavBar = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink exact to='/' activeClassName='active-nav'>
                        <img src='/img/home.png' alt='home' />
                    </NavLink>
                    <br/>
                    <NavLink exact to='/profil' activeClassName='active-nav'>
                        <img src='/img/user.png' alt='user' />
                    </NavLink> 
                </div>
            </div>
        </div>
    );
};

export default LeftNavBar;