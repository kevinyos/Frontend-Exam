import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Form
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import {Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {Logout} from '../Redux/Action';

  

const NavBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch()
  //penulisan baru untuk localstorage
  const logOut = () =>{
    dispatch(Logout())
    localStorage.removeItem('token')
  }
  // penulisan lama
  // const logOut = () =>{
  //   localStorage.removeItem('username')
  // }

  return (
    <div>
    <Navbar expand="md" light style={{ backgroundColor : 'none' }}>
      <Link to='/'>
        <NavbarBrand>Shoesilo</NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink>Men</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Women</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Kids</NavLink>
          </NavItem>
        {/* </Nav> */}
        {/* <Nav navbar> */}
        {
              props.logged
              ? 
                  <UncontrolledDropdown nav inNavbar style={{ float: 'right' }}>
                <DropdownToggle nav caret style={{fontWeight:'700'}}>
                   {props.username}
                  {/* <FontAwesomeIcon icon={faUser}/> */}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to='/cart'>
                    <DropdownItem>
                      Cart
                    </DropdownItem>
                  </Link>
                  <Link to='/transaction'>
                    <DropdownItem>
                      Transaction
                    </DropdownItem>
                  </Link>
                  <Link to='/profile'>
                    <DropdownItem>
                      Profile
                    </DropdownItem>
                  </Link>
                  <Link to='/' >
                  <div onClick={logOut}>
                    <DropdownItem onClick={props.Logout}  >
                      Log out
                    </DropdownItem>
                    </div>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              <UncontrolledDropdown nav inNavbar style={{ float: 'right' }}>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faUser}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to='/login'>
                    <DropdownItem>
                      Login
                    </DropdownItem>
                  </Link>
                  <Link to='/register'>
                    <DropdownItem>
                      Register
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
        </Nav>
      </Collapse>
    </Navbar>
  </div>
  );
}

const mapStateToProps = (state) =>{
  return{
    logged:state.auth.logged,
    username:state.auth.username
  }
}

export default connect(mapStateToProps, {Logout}) (NavBar);
