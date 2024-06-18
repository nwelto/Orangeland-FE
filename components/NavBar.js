/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>CHANGE ME</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/guests/guestPage">
              <Nav.Link>Guests</Nav.Link>
            </Link>
            <Link passHref href="/reservations/reservationPage">
              <Nav.Link>Reservations</Nav.Link>
            </Link>
            <Link passHref href="/BikePage">
              <Nav.Link>Bikes</Nav.Link>
            </Link>
            <Link passHref href="/RVSite">
              <Nav.Link>RV Sites</Nav.Link>
            </Link>
            {user?.isAdmin && (
              <Link passHref href="/AdminPage">
                <Nav.Link>Admin</Nav.Link>
              </Link>
            )}
          </Nav>
          <Nav>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
