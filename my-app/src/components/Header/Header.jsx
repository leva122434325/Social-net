import React from 'react';
import { NavLink } from 'react-router-dom';
import cff from './Header.module.css';
import logo from '../../assets/img/logotype.jpg'

const Header = (props) => {

  return <header className={cff.header}>
    <div>
    <NavLink to={'/profile/'}>
      <img src={logo} alt="logo" />
      </NavLink>
    </div>
    <div className={cff.loginBlock}>
      {props.isAuth
        ? <div className={cff.username}>{props.login} - <button className={cff.logout} onClick={props.logOut}>logout</button></div>
        : <NavLink  to={'/login'}> Login</NavLink>}
    </div>
  </header>

}

export default Header;