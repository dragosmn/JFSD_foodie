import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function AdminDashboard() {
    const [restaurants, setRestaurants] = useState([]);
    
    const navigate = useNavigate(); 

    
    const urlRestaurants = "http://localhost:9090/restaurant/findrestaurantinfobyid";
    const urlDeleteRestaurants = "http://localhost:9090/restaurant/delete/";

   
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(urlRestaurants);
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleDelete = async (resid) => {
        try {
            await axios.delete(urlDeleteRestaurants + resid);
            console.log(`Deleted restaurant with ID: ${resid}`);
            
           
            window.location.reload();
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const handleModify = (resid) => {
        sessionStorage.setItem("resid", resid);
        navigate("/modifyrestaurant"); 
        console.log(`Modify restaurant with ID: ${resid}`);
    };

    const handleAddRestaurant = () => {
        navigate("/addrestaurant"); 
    };

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

            {/* Text Section */}
            <div className="container mt-5">
                <h1 className="text-center">Welcome to foodie Admin Dashboard</h1>
            </div>

            {/* Manage Restaurants Section */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-start">Manage Restaurants</h2>
                    <Button variant="success" onClick={handleAddRestaurant}>Add a new restaurant</Button> 
                </div>
                <ul className="list-group mt-3">
                    {restaurants.map((restaurant) => {
                        const resinfo = restaurant.split(',');
                        const resid = resinfo[0];
                        const resname = resinfo[1];
                        const rescity = resinfo[2];
                        return (
                            <li key={resid} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{resname}</strong><br />
                                    <small>{rescity}</small>
                                </div>
                                <div>
                                    <Button variant="danger" onClick={() => handleDelete(resid)}>Delete</Button>
                                    <Button variant="warning" className="ms-2" onClick={() => handleModify(resid)}>Modify</Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
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

export default AdminDashboard;
