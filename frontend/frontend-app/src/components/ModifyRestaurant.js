import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ModifyRestaurant() {
    const [dishes, setDishes] = useState([]);
    const [resName, setResName] = useState("");
    const [selectedDishId, setSelectedDishId] = useState(null); 
    const [newPrice, setNewPrice] = useState(""); 

    let urlDish = "http://localhost:9090/dish/finddishbyresid/";
    let urlUpdatePrice = "http://localhost:9090/dish/updatedishprice/";
    let resid = sessionStorage.getItem("resid");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCityAndDishes = async () => {
            try {
                const dishResponse = await axios.get(urlDish + resid);
                setDishes(dishResponse.data);

                const resNameResponse = await axios.get("http://localhost:9090/restaurant/findrestaurantnamebyid/" + resid);
                setResName(resNameResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCityAndDishes();
    }, [resid]);

    const handleDelete = async (dishid) => {
        try {
            await axios.delete("http://localhost:9090/dish/deletedishbydishid/" + dishid);
            setDishes(dishes.filter(dish => dish.split(',')[0] !== dishid));
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    const handleModify = (dishid) => {
        setSelectedDishId(dishid); 
    };

    const handleNewPriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const handlePriceSubmit = async (event, dishid) => {
        event.preventDefault();
        try {
            await axios.post(`${urlUpdatePrice}${dishid}/${newPrice}`); 
            
            setDishes(dishes.map(dish => {
                const dishinfo = dish.split(',');
                if (dishinfo[0] === dishid) {
                    dishinfo[5] = newPrice; 
                }
                return dishinfo.join(',');
            }));
            setSelectedDishId(null); 
        } catch (error) {
            console.error('Error updating price:', error);
        }
    };

    
    const groupDishesByType = (dishes) => {
        return dishes.reduce((acc, dish) => {
            const [dishid, dishname, dishtype, dishdesc, , dishprice] = dish.split(',');
            if (!acc[dishtype]) {
                acc[dishtype] = [];
            }
            acc[dishtype].push({ dishid, dishname, dishdesc, dishprice });
            return acc;
        }, {});
    };

    const groupedDishes = groupDishesByType(dishes);

    const handleAddDish = useCallback(() => {
        navigate("/adddish");
    }, [navigate]);

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
                <h1 className="text-center">Modify {resName} Restaurant</h1>
            </div>

            {/* Dishes Section */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-start">Manage Dishes</h2>
                    <Button variant="success" onClick={handleAddDish}>Add a new Dish</Button> 
                </div>
                <div className="row justify-content-center">
                    {dishes.length > 0 ? (
                        Object.keys(groupedDishes).map((type, typeIndex) => (
                            <div key={typeIndex} className="mb-3 w-100">
                                <div style={{ textAlign: 'left' }}>
                                    <h3>{type}</h3>
                                </div>
                                <ul className="list-group mt-3">
                                    {groupedDishes[type].map((dish, index) => {
                                        const { dishid, dishname, dishdesc, dishprice } = dish;

                                        return (
                                            <li key={dishid} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div style={{ textAlign: 'left' }}>
                                                    <strong>{dishname}</strong><br />
                                                    <small>{dishdesc}</small><br />
                                                    <small>{dishprice} RON</small>
                                                </div>
                                                <div>
                                                    <Button variant="danger" onClick={() => handleDelete(dishid)}>Delete</Button>
                                                    <Button variant="warning" className="ms-2" onClick={() => handleModify(dishid)}>Modify Price</Button>
                                                </div>
                                                
                                                {selectedDishId === dishid && (
                                                    <Form className="mt-3" onSubmit={(event) => handlePriceSubmit(event, dishid)}>
                                                        <Form.Group controlId="newPrice">
                                                            <Form.Label>Enter new price</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Enter new price"
                                                                value={newPrice}
                                                                onChange={handleNewPriceChange}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit" className="mt-2">
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Loading dishes...</p>
                    )}
                </div>
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

export default ModifyRestaurant;
