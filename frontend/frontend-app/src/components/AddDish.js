import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

function AddDish() {
  let url = "http://localhost:9090/dish/insert";
  let [dishname, setDishName] = useState("");
  let [dishtype, setDishType] = useState("");
  let [dishdesc, setDishDesc] = useState("");
  let [dishprice, setDishPrice] = useState(0.0);
  let [error, setError] = useState("");
  let navigate = useNavigate();

  let resid = sessionStorage.getItem("resid");
  let dishphoto = "";
  let dishavail = true;

  let handleSubmit = (event) => {
    event.preventDefault();
    if (dishname.length === 0 || dishtype.length === 0 || dishdesc.length === 0 || dishprice === 0.0) {
      setError("Please fill in all fields");
    } else {
      let dishInfo = { resid, dishname, dishtype, dishphoto, dishdesc, dishavail, dishprice };
      axios.post(url, dishInfo).then(result => {
        setError(result.data);
      }).catch(error => console.log(error));
    }
    setDishName("");
    setDishType("");
    setDishDesc("");
    setDishPrice(0.0);
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
        <h3 className="mt-4">Add Dish Info</h3>

        <Form onSubmit={handleSubmit} className="w-50 mt-4" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold text-start w-100"><strong>Dish Name</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Dish Name" value={dishname} onChange={(e) => setDishName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicType">
            <Form.Label className="fw-bold text-start w-100"><strong>Dish Type</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Dish Type" value={dishtype} onChange={(e) => setDishType(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicDesc">
            <Form.Label className="fw-bold text-start w-100"><strong>Dish Description</strong></Form.Label>
            <Form.Control type="text" placeholder="Enter Dish Description" value={dishdesc} onChange={(e) => setDishDesc(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPrice">
            <Form.Label className="fw-bold text-start w-100"><strong>Dish Price</strong></Form.Label>
            <Form.Control type="number" placeholder="Enter Dish Price" value={dishprice} onChange={(e) => setDishPrice(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Add Dish
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

export default AddDish;