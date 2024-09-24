import { Box, Button, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Firebase/FirebaseConfig';
import axios from 'axios'; // Use axios to make HTTP requests

const app = initializeApp(firebaseConfig);

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        dob: '',
        profession: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission which causes page reload
        const auth = getAuth();

        // Create user with Firebase
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed up 
                updateProfile(auth.currentUser, {
                    displayName: formData.name,
                }).then(() => {
                    alert("Profile Name Updated");
                    console.log("User Profile Updated");

                    // After updating the profile, send user data to the backend
                    axios.post('http://localhost:5000/users', {
                        name: formData.name,
                        email: formData.email,
                        mobile: formData.mobile,
                        dob: formData.dob,
                        profession: formData.profession
                    })
                    .then((response) => {
                        console.log('User stored in MongoDB:', response.data);
                        alert("User data saved to MongoDB");
                    })
                    .catch((error) => {
                        console.error('Error saving user to MongoDB:', error);
                    });

                }).catch((error) => {
                    alert("Profile Update Failed");
                    console.error("Error updating user profile", error);
                });

                const user = userCredential.user;
                alert("User Signed Up");
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(`Error: ${errorMessage}`);
            });

        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            password: '',
            mobile: '',
            dob: '',
            profession: ''
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
                Registration Form
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>

                <TextField
                    label="Name"
                    name="name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />

                <TextField
                    label="Mobile Number"
                    name="mobile"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleChange}
                />

                <TextField
                    label="Profession"
                    name="profession"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.profession}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 2,
                        background: 'black',
                        color: 'white',
                        '&:hover': {
                            background: '#424242',
                            color: 'white'
                        }
                    }}
                >
                    Register
                </Button>
                <Box
                    sx={{
                        margin: '5% 0 5% 0',
                    }}
                >
                    <Typography><Link to={"/Login"} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>Already have an account? Go to signin</Link></Typography>
                </Box>
            </form>
        </Box>
    )
}
