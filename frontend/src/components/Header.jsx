import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>Goalsetter</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/registration'>
                        <FaUser/>
                        Register
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
