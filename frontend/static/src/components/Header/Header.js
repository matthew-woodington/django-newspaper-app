import "../../styles/Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header({ superState, logoutUser }) {
  return (
    <>
      <Navbar expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="app-logo" href="/">
            BRO. News Co.
          </Navbar.Brand>
          <div className="desk-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {superState.auth ? (
                <>
                  <Nav.Link href="articles/user">My Articles</Nav.Link>
                  <Nav.Link href="/" onClick={logoutUser}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div className="tag-line">The One-Stop For All BRO. News</div>

      <Nav className="me-auto mobile-nav">
        <Nav.Link href="/">Home</Nav.Link>
        {superState.auth ? (
          <>
            <Nav.Link href="articles/user">My Articles</Nav.Link>
            <Nav.Link href="/" onClick={logoutUser}>
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
          </>
        )}
      </Nav>
    </>
  );
}

export default Header;
