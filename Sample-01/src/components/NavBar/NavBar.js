import React, { useState } from "react";
import { NavLink as RouterNavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {faChartPie} from "@fortawesome/free-solid-svg-icons";

import style from "./navBar.module.scss";

import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div className={style.navContainer}>
      <Navbar className={style.navbar}  expand="xs">

          <div>
            <h1 className={style.navbarHeader} >Дашборд</h1>
              {isAuthenticated && (<h3 className={style.navbarSubHeader}>Данные за последние 24 часа</h3>)}
          </div>
          {isAuthenticated && (<div className={style.navbarLinks}>
            <RouterNavLink  to={`/`} exact activeClassName={style.active}>Дашборд</RouterNavLink >
            <RouterNavLink  to={`/clients`}  activeClassName={style.active}>Клиенты</RouterNavLink >
          </div>)}

          <Collapse isOpen={isOpen} navbar className={style.navbarCollapse}>
              {isAuthenticated && (<div className={style.navbarIcons}>
                  <FontAwesomeIcon icon="link" className={`mr-2 regular ${style.navbarIco}`} />
                  <FontAwesomeIcon icon={faChartPie} className={`mr-2 ${style.navbarIco}`} />
                  <div className={style.navbarActiveIcon}>
                      <div className={style.navbarActiveIconCircle}></div>
                      <FontAwesomeIcon icon="link" className={`mr-2 ${style.navbarIco}`} />
                  </div>
                <FontAwesomeIcon icon={faSun} className={`mr-2 ${style.navbarIco}`} />
                <FontAwesomeIcon icon="user" className={`mr-2 ${style.navbarIco}`} />

              </div>)}
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className={`nav-user-profile  ${style.navbarProfileImg}`}
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu className={style.navbarDropdownMenu}>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
