import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import './header.css'
// import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <Navbar
      //   bg="dark"
      //   variant="dark"
      style={{ height: '60px' }}
      className="navbar"
    >
      <Container>
        <NavLink to="/" className="text-decoration-none text-light">
          Home
        </NavLink>
      </Container>
    </Navbar>
  )
}

export default Header
