import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
    });
  }

  handleLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    this.setState({ isAuthenticated: false });
    window.location.reload(false);
  };

  render() {
    return (
      <div className="App container">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            {!JSON.parse(localStorage.getItem("isAuthenticated")) ? (
              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/kanban">Task Management</Nav.Link>
                <Nav.Link href="#" onClick={() => this.handleLogout()}>
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </Navbar>
        <Routes />
      </div>
    );
  }
}
export default App;
