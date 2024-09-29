import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

function DishList() {
    const [city, setCity] = useState(null); 
    const [dishes, setDishes] = useState([]); 
    const [userName, setUserName] = useState(""); 
    const [resName, setResName] = useState(""); 
    const [cart, setCart] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0); 

    let urlCity = "http://localhost:9090/user/findcitybyuser/";
    let urlDish = "http://localhost:9090/dish/finddishbyresid/";
    let urlResName = "http://localhost:9090/restaurant/findrestaurantnamebyid/";
    let user = sessionStorage.getItem("user");
    let resid = sessionStorage.getItem("resid");

    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCityAndDishes = async () => {
            try {
               
                const cityResponse = await axios.get(urlCity + user);
                setCity(cityResponse.data);

                
                const dishResponse = await axios.get(urlDish + resid);
                setDishes(dishResponse.data);

                
                const resNameResponse = await axios.get(urlResName + resid);
                setResName(resNameResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        
        setUserName(user);

        fetchCityAndDishes();
    }, [user]);

    
    const groupDishesByType = (dishes) => {
        return dishes.reduce((acc, dish) => {
            const dishinfo = dish.split(',');
            const dishtype = dishinfo[2];
            if (!acc[dishtype]) {
                acc[dishtype] = [];
            }
            acc[dishtype].push(dish);
            return acc;
        }, {});
    };

    const groupedDishes = groupDishesByType(dishes);

    
    const addToCart = (dish, price) => {
        const updatedCart = [...cart, { name: dish, price }];
        setCart(updatedCart);
        setTotalPrice(prevTotal => prevTotal + parseFloat(price));

        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('totalPrice', totalPrice + parseFloat(price));
    };

    
    const handleCartClick = () => {
        navigate('/cart');
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
                        <Button variant="primary" onClick={handleCartClick}>
                            Cart: {totalPrice} RON
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Text Section */}
            <div className="container mt-5">
                <h1 className="text-center">{resName}</h1>
            </div>

            {/* Dishes Section */}
            <div className="container mt-4">
                <div className="row justify-content-center">
                    {dishes.length > 0 ? (
                        Object.keys(groupedDishes).map((type, typeIndex) => (
                            <div key={typeIndex} className="mb-3 w-100">
                                <div style={{ textAlign: 'left' }}>
                                    <h2>{type}</h2>
                                </div>
                                <Accordion defaultActiveKey={['0']} alwaysOpen>
                                    {groupedDishes[type].map((dish, index) => {
                                        const dishinfo = dish.split(',');
                                        const dishname = dishinfo[1];
                                        const dishdesc = dishinfo[3];
                                        const dishprice = dishinfo[5];

                                        return (
                                            <Accordion.Item key={index} eventKey={index}>
                                                <Accordion.Header>
                                                    <div style={{ flex: 1 }}>{dishname}</div>
                                                    <div style={{ marginLeft: 'auto', float: 'right' }}>
                                                        {dishprice} RON
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {dishdesc}
                                                    <Button variant="success" className="mt-2" onClick={() => addToCart(dishname, dishprice)}>
                                                        Add to Cart
                                                    </Button>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        );
                                    })}
                                </Accordion>
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

export default DishList;
