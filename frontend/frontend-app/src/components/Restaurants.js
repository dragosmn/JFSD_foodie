import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Restaurants() {
    const [city, setCity] = useState(null); 
    const [photos, setPhotos] = useState([]); 
    const [userName, setUserName] = useState(""); 
    const [cusines, setCusines] = useState([]);
    const [cusine, setCusine] = useState("");
    const [name, setName] = useState("");

    let urlCity = "http://localhost:9090/user/findcitybyuser/";
    let urlPhoto = "http://localhost:9090/restaurant/findrestaurantbycity/";
    let urlCusines = "http://localhost:9090/restaurant/findrestaurantcusines/";
    let urlPhotoCusine = "http://localhost:9090/restaurant/filterrestaurantbycusine/";
    let urlPhotoName = "http://localhost:9090/restaurant/findrestaurantbyname/";
    let urlPhotoCusineName = "http://localhost:9090/restaurant/filterrestaurantbycusineandname/";
    let user = sessionStorage.getItem("user");

    
    useEffect(() => {
        const fetchCityAndPhotos = async () => {
            try {
                
                const cityResponse = await axios.get(urlCity + user);
                setCity(cityResponse.data);

                const cusinesResponse = await axios.get(urlCusines + cityResponse.data);
                setCusines(cusinesResponse.data);

                const photosResponse = await axios.get(urlPhoto + cityResponse.data);
                setPhotos(photosResponse.data);



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        
        setUserName(user);

        fetchCityAndPhotos();
    }, [user]);

    let typingTimeout = null;

const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setName(selectedName);
    setPhotos([]); 

    
    clearTimeout(typingTimeout);

    
    typingTimeout = setTimeout(async () => {
        try {
            let photosResponse;

            
            if (!selectedName) {
                
                if (!cusine) {
                    photosResponse = await axios.get(`${urlPhoto}${city}`);
                } else {
                    
                    photosResponse = await axios.get(`${urlPhotoCusine}${cusine}/${city}`);
                }
            } else {
                
                if (!cusine) {
                    
                    photosResponse = await axios.get(`${urlPhotoName}${selectedName}/${city}`);
                } else {
                    
                    photosResponse = await axios.get(`${urlPhotoCusineName}${cusine}/${city}/${selectedName}`);
                }
            }

            const photosData = photosResponse.data;

           
            if (photosData.length === 0) {
                setPhotos([]);
                console.log('No restaurants match your search.');
            } else {
                setPhotos(photosData);
            }

        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }, 300);  
};

let navigate = useNavigate();

const handleButtonRes = (event) => {
    const resid = event.target.value;
    sessionStorage.setItem("resid",resid);
    navigate("/dishlist")
}

const handleCuisineChange = async (event) => {
    const selectedCuisine = event.target.value;
    setCusine(selectedCuisine);
    setPhotos([]);  

    try {
        let photosResponse;

        if (!selectedCuisine) {
            if (!name) {
                photosResponse = await axios.get(`${urlPhoto}${city}`);
            }else {
                photosResponse = await axios.get(`${urlPhotoName}${name}/${city}`);
            }
        } else {
            if (!name) {
                photosResponse = await axios.get(`${urlPhotoCusine}${selectedCuisine}/${city}`);
            } else {
                photosResponse = await axios.get(`${urlPhotoCusineName}${selectedCuisine}/${city}/${name}`);
            }
        }

        const photosData = photosResponse.data;

        if (photosData.length === 0) {
            setPhotos([]);
            console.log('No restaurants match your search.');
        } else {
            setPhotos(photosData);
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};

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
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Navbar.Text>
                                City: <span>{city}</span>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>

            {/* Search Form */}
            <Container className="mt-4">
                <Form>
                    <div className="row">
                        <div className="col-md-9">
                            <Form.Group controlId="formRestaurantName">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name of Restaurant"
                                        aria-label="Restaurant Name"
                                        onChange={handleNameChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="col-md-3">
                            <Form.Select aria-label="Filter by Cusine" onChange={handleCuisineChange}>
                                <option value="">Filter by Cusine</option>
                                {cusines.map((cus, index) => (<option key={index} value={cus}>{cus}</option>))}
                            </Form.Select>
                        </div>
                    </div>
                </Form>
            </Container>

           

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

            
            <footer className="bg-dark text-light py-4 mt-auto">
                <div className="container text-center">
                    <p>&copy; 2024 foodie. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Restaurants;
