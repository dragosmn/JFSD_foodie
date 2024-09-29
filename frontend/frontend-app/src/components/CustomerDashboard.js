import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CustomerDashboard() {
  const [city, setCity] = useState(null); 
  const [photos, setPhotos] = useState([]); 
  const [userName, setUserName] = useState(""); 

  let urlCity = "http://localhost:9090/user/findcitybyuser/";
  let urlPhoto = "http://localhost:9090/restaurant/findrestaurantbycity/";
  let user = sessionStorage.getItem("user");

  
  useEffect(() => {
    const fetchCityAndPhotos = async () => {
      try {
        
        const cityResponse = await axios.get(urlCity + user);
        setCity(cityResponse.data);

        
        const photosResponse = await axios.get(urlPhoto + cityResponse.data);
        setPhotos(photosResponse.data.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    setUserName(user);

    fetchCityAndPhotos();
  }, [user]);

  let navigate = useNavigate();

const handleButtonRes = (event) => {
    const resid = event.target.value;
    sessionStorage.setItem("resid",resid);
    navigate("/dishlist")
}

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">foodie</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown title={<span>{userName}</span>} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/usersettings">User Settings</NavDropdown.Item>
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
              </NavDropdown>
              <Navbar.Text>
                City: <span>{city}</span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>


      {/* Text Section */}
      <div className="container mt-5">
        <h1 className="text-center">Welcome to foodie</h1>
        <p className="text-center">
          We bring your favourite restaurants directly to you doorstep
        </p>
      </div>

      {/* Photos Section */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {photos.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center">
              {photos.map((photo, index) => {
                
                const resinfo = photo.split(',');
                const title = resinfo[1];
                const img = resinfo[0];
                const id = resinfo[2];
                const imgSrc = `/images/${img}.png`;
                
                return (
                  <div key={index} className="col-md-2.5 mb-2">
                    <div className="my-box">
                      <Card style={{ width: '18rem', margin: 'auto' }} className="mx-2">
                        <Card.Img variant="top" src={imgSrc} alt={`Photo ${index + 1}`} className="img-fluid mx-auto d-block" />
                        <Card.Body>
                          <Card.Title>{title}</Card.Title>                          
                          <Button variant="primary" value={id} onClick={handleButtonRes}>Go to restaurant</Button>
                        </Card.Body>
                      </Card>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading photos...</p> 
          )}
        </div>
      </div>

      {/* Text under the Pictures */}
      <div className="container mt-4">
        <p className="text-center">Here are the most popular restaurants in your city.</p>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p>&copy; 2024 foodie. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default CustomerDashboard;
