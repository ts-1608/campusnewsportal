import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>News Portal</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>News</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/publish">
              <Nav.Link>Publish</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/delete">
              <Nav.Link>Delete</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/archive">
              <Nav.Link>Archive</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
