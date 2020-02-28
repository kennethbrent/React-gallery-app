import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/search/atlanta'>Atlanta</NavLink></li>
                <li><NavLink to='/search/golf'>Golf</NavLink></li>
                <li><NavLink to='/search/coding'>Coding</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;