import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    let url = "http://localhost:9090/user/signin";

    let [username, setUserName] = useState("");
    let [userpassword, setUserPassword] = useState("");
    let [error, setError] = useState("");
    let navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault();
        if (username.length === 0 || userpassword.length === 0) {
            setError("Please enter both email and password");
        } else {
            let login = { username, userpassword };
            axios.post(url, login).then(result => {
                if (result.data === "user login successfully") {
                    sessionStorage.setItem("user", username);
                    navigate("/user");
                } else if (result.data === "Admin login successfully") {
                    navigate("/admin");
                } else {
                    setError(result.data);
                }
            }).catch(error => console.log(error));
        }
        setUserName("");
        setUserPassword("");
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

            {/* Login Form */}
            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1" style={{ paddingTop: "2vh" }}>
                <div style={{ width: '300px', textAlign: 'center' }}>
                    <span style={{ color: "red" }}>{error}</span>
                    <h3 className="mb-4">Please Login</h3> 
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="fw-bold text-start w-100">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username"
                                onChange={(event) => setUserName(event.target.value)}
                                value={username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label className="fw-bold text-start w-100">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password"
                                onChange={(event) => setUserPassword(event.target.value)}
                                value={userpassword} 
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                            <Button variant="danger" type="reset">
                                Reset
                            </Button>
                        </div>
                    </Form>

                    
                    <p className="mt-4">Don't have an account?</p> 
                    <Button variant="secondary" onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
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

export default Login;
