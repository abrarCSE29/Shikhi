import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import firebaseConfig from '../Firebase/FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext); // Access setUser from context
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission which causes page reload

        // Set the persistence to local to survive page reloads
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                // Sign in the user
                return signInWithEmailAndPassword(auth, formData.email, formData.password);
            })
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert(`Dear ${user.displayName || user.email}, Successfully signed in`);

                // Fetch additional user details from MongoDB
                return axios.get(`http://localhost:5000/users/${formData.email}`);
            })
            .then((response) => {
                const mongoUser = response.data;
                const newUser = {
                    ...loggedInUser,
                    name: mongoUser.name,
                    email: mongoUser.email,
                    mobile: mongoUser.mobile,
                    dob: mongoUser.dob,
                    profession: mongoUser.profession,
                    isSignedIn: true
                };
                setLoggedInUser(newUser);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Error during login:", error);
                setError(true);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                maxWidth: 400,
                margin: 'auto',
                mt: 5,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={error}
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    helperText={error && "Please enter a valid email and password."}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={error}
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    helperText={error && "Please enter a valid email and password."}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 2
                    }}
                >
                    Login
                </Button>
                <Box
                    sx={{
                        margin: '5% 0 5% 0',
                    }}
                >
                    <Typography><Link to={"/Signup"} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}> No account? Create one</Link></Typography>
                </Box>
            </form>
        </Box>
    );
}
