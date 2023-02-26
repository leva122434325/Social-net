import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Nav.module.css';

const Navbar = () => {
  return <nav className={classes.nav}>
              <div className={classes.item}>
                <Link className={classes.item}
                 to={'/profile'}  > Profile
                </Link >
              </div>
              <div className={classes.item}>
              <Link to={'/dialogs'} > Dialogs
                </Link >
              </div>
              <div className={classes.item}>
              <Link to={'/users'} > Users
                </Link >
              </div>
            </nav>
};

export default Navbar;