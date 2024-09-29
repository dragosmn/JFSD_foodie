import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUp() {
  let url = "http://localhost:9090/user/insert";
  let [username, setUserName] = useState("");
  let [userpassword, setUserPassword] = useState("");
  let [userCity, setUserCity] = useState("");
  let [error, setError] = useState("");
  let navigate = useNavigate();

  let handleSubmit = (event) => {
    event.preventDefault();
    if (username.length === 0 || userpassword.length === 0 || userCity.length === 0) {
      setError("Please fill in all fields");
    } else {
      let login = { username, userpassword, userCity };
      axios.post(url, login).then(result => {
        setError(result.data);
      }).catch(error => console.log(error));
    }
    setUserName("");
    setUserPassword("");
    setUserCity("");
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">foodie</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>

      {/* Form Section */}
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <span style={{ "color": "red" }}>{error}</span>
        <h3 className="mt-4">Sign Up</h3>

        <Form onSubmit={handleSubmit} className="w-50 mt-4" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="fw-bold text-start w-100"><strong>Username</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUserName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold text-start w-100"><strong>Password</strong></Form.Label>
            <Form.Control type="password" placeholder="Password" value={userpassword} onChange={(e) => setUserPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicCity">
            <Form.Label className="fw-bold text-start w-100"><strong>City</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter your city" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Sign Up
          </Button>
          <Button variant="danger" type="reset">
            Reset
          </Button>
        </Form>

        <p className="mt-3">
          Already have an account?
        </p>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Login
        </Button>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p>&copy; 2024 foodie. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignUp;
