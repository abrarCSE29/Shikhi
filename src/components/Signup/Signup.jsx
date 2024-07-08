import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [formData, setFormData] = useState({
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
        e.preventDefault(); // Prevent form submission which causes page reload
        setFormData({
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
                        mt: 2 ,
                        background : 'black',
                        color : 'white',
                        '&:hover' : {
                            background : '#424242',
                            color : 'white'
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
                    <Typography ><Link to={"/Login"} style={{textDecoration : 'none', color : 'blue', fontWeight : 'bold'}}> Already have an account ? Go to signin</Link> </Typography>
                </Box>
            </form>
        </Box>
    )
}
