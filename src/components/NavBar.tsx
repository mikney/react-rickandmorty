import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts";

const NavBar = () => {

  const navigate = useNavigate();

  return (
      <Navbar bg="light" expand="lg">
        <Container className='flex justify-content-between'>
          <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => navigate(HOME_ROUTE)}>Rick And Morty</Navbar.Brand>
        </Container>
      </Navbar>
  );
};

export default NavBar;