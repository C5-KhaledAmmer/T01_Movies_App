import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./style.css";

export const NavBar = () => {
  return (
    <div className="nav-bar-div-mine">
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/">
          <img
            className="logo"
            src="https://i.pinimg.com/originals/fb/40/23/fb4023dd231d5f5d3be363a89fe0e221.png"
          />
        </Navbar.Brand>
        <Nav.Link href="/#Now Playing">Now Playing</Nav.Link>
        <Nav.Link href="/#Top Rated">Top Rated</Nav.Link>
        <Nav.Link href="/#Popular">Popular</Nav.Link>
        <Nav.Link href="/#Upcoming">Upcoming</Nav.Link>

        <Nav.Link href="/Favorite">Favorite</Nav.Link>
      </Navbar>
    </div>
  );
};
