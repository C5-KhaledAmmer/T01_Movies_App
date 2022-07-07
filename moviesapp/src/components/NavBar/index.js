import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

export const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/">Movies</Navbar.Brand>
          <Nav.Link href="/#Now Playing">Now Playing</Nav.Link>
          <Nav.Link href="/#Top Rated">Top Rated</Nav.Link>
          <Nav.Link href="/#Popular">Popular</Nav.Link>
          <Nav.Link href="/#Upcoming">Upcoming</Nav.Link>
          
          <Nav.Link href="/Favorite">Favorite</Nav.Link>
      
       
  
    </Navbar>
  );
};
