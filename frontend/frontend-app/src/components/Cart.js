import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Cart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const priceData = parseFloat(localStorage.getItem('totalPrice')) || 0;

        setCart(cartData);
        setTotalPrice(priceData);
    }, []);

    
    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateTotalPrice(updatedCart); 
    };

    
    const updateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * (item.amount || 1)), 0);
        setTotalPrice(total);
        localStorage.setItem('totalPrice', total.toFixed(2));
    };

    
    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.amount += 1; 
        } else {
            acc.push({ ...item, amount: 1 }); 
        }
        return acc;
    }, []);

    
    const handleAddMore = (dish) => {
        const updatedCart = [...cart, { name: dish.name, price: dish.price }];
        updateCart(updatedCart);
    };

    
    const handleRemoveOne = (dish) => {
        const itemIndex = cart.findIndex(item => item.name === dish.name);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(itemIndex, 1); 
            updateCart(updatedCart);
        }
    };

    
    const handleDeleteDish = (dish) => {
        const updatedCart = cart.filter(item => item.name !== dish.name);
        updateCart(updatedCart);
    };

    
    
    const handleCheckout = async () => {
        const orderDetails = groupedCart.map((item, index) => ({
            dishid: index + 1, 
            odamount: item.amount
        }));
    
        const username = sessionStorage.getItem("user");
        
        try {
            
            const userResponse = await axios.get(`http://localhost:9090/user/finduserid/${username}`);
            const userid = userResponse.data; 
    
            const orderPayload = {                      
                userid: userid,
                orderprice: totalPrice
            };
    
            const response = await axios.post('http://localhost:9090/orders/insert', orderPayload);
            alert('Order successfully placed!');
    
            
            updateCart([]);
            navigate('/restaurants');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to place order.');
        }
    };

    
    const handleResetCart = () => {
        updateCart([]);
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
                        <Button variant="primary" onClick={() => navigate('/cart')}>
                            Cart: {totalPrice.toFixed(2)} RON
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Cart Content */}
            <div className="container mt-5">
                <h1>Your Shopping Cart</h1>
                {groupedCart.length > 0 ? (
                    <ul>
                        {groupedCart.map((item, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                <span>
                                    {item.name} - {item.amount} x {item.price} RON
                                </span>
                                <span>
                                    <Button variant="danger" className="me-2" onClick={() => handleDeleteDish(item)}>
                                        Delete
                                    </Button>
                                    <Button variant="warning" className="me-2" onClick={() => handleRemoveOne(item)}>
                                        Remove 1
                                    </Button>
                                    <Button variant="success" onClick={() => handleAddMore(item)}>
                                        Add 1 More
                                    </Button>
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty</p>
                )}
                <h3>Total Price: {totalPrice.toFixed(2)} RON</h3>
                <Button variant="primary" className="me-2" onClick={handleCheckout}>
                    Checkout
                </Button>
                <Button variant="secondary" onClick={handleResetCart}>
                    Reset Cart
                </Button>
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

export default Cart;
