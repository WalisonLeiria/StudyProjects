import './Nav.css';
import React from 'react';

const Nav = props => <aside className="menu-area">
  <nav className="menu">
    <a href="/">
      <i className="fa fa-home"> Inicio</i>
    </a>
    <a href="/users">
      <i className="fa fa-users"> Usuários</i>
    </a>
  </nav>
</aside>

export default Nav;