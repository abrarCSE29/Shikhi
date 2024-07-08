import { Box, Button, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Firebase/FirebaseConfig';

const app = initializeApp(firebaseConfig);

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed up 
                updateProfile(auth.currentUser, {
                    displayName: formData.name,
                }).then(() => {
                    alert("Profile Name Updated");
                    console.log("User Profile Updated");
                }).catch((error) => {
                    alert("Profile Update Failed");
                    console.error("Error updating user profile", error);
                });
                const user = userCredential.user;
                alert("User Signed Up");
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });



        e.preventDefault(); // Prevent form submission which causes page reload
        setFormData({
            name: '',
            email: '',
            password: ''
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
                    <Typography ><Link to={"/Login"} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}> Already have an account ? Go to signin</Link> </Typography>
                </Box>
            </form>
        </Box>
    )
}
