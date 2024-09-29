import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

function AddRestaurant() {
  let url = "http://localhost:9090/restaurant/insert";
  let [resname, setResName] = useState("");
  let [rescity, setResCity] = useState("");
  let [rescusine, setResCusine] = useState("");
  let [resphoto, setResPhoto] = useState("");
  let [error, setError] = useState("");
  let navigate = useNavigate();

  let handleSubmit = (event) => {
    event.preventDefault();
    if (resname.length === 0 || rescity.length === 0 || rescusine.length === 0 || resphoto.length === 0) {
      setError("Please fill in all fields");
    } else {
      let resInfo = { resname, rescity, rescusine, resphoto };
      axios.post(url, resInfo).then(result => {
        setError(result.data);
      }).catch(error => console.log(error));
    }
    setResName("");
    setResCity("");
    setResCusine("");
    setResPhoto("");
  }

  return (
    <div className="d-flex flex-column min-vh-100">
       {/* Navbar */}
       <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">foodie</Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="me-auto">
                        <Nav.Link href="/admin">Admin Dashboard</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Logout /> 
                    </Nav>
                </Container>
            </Navbar>

      {/* Form Section */}
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <span style={{ "color": "red" }}>{error}</span>
        <h3 className="mt-4">Add Restaurant Info</h3>

        <Form onSubmit={handleSubmit} className="w-50 mt-4" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold text-start w-100"><strong>Restaurant Name</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Restaurant Name" value={resname} onChange={(e) => setResName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label className="fw-bold text-start w-100"><strong>Restaurant City</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Restaurant City" value={rescity} onChange={(e) => setResCity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicCusine">
            <Form.Label className="fw-bold text-start w-100"><strong>Restaurant Cusine</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Restaurant Cusine" value={rescusine} onChange={(e) => setResCusine(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPhoto">
            <Form.Label className="fw-bold text-start w-100"><strong>Restaurant Photo Name</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Restaurant Photo Name" value={resphoto} onChange={(e) => setResPhoto(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Add Restaurant
          </Button>
          <Button variant="danger" type="reset">
            Reset
          </Button>
        </Form>
       
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

export default AddRestaurant;