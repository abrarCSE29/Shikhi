import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import firebaseConfig from '../Firebase/FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const app = initializeApp(firebaseConfig);
export default function Login() {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { loggedInUser, setLoggedInUser } = useContext(UserContext); // Access setUser from context
    const navigate = useNavigate();
    console.log(loggedInUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert(`Dear ${user.displayName}, Successfully signed in`);
                const newUser = {...loggedInUser};
                newUser.name = user.displayName;
                newUser.email = user.email;
                newUser.isSignedIn = true;
                setLoggedInUser(newUser);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });


        e.preventDefault(); // Prevent form submission which causes page reload
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
                    }
                    }
                >
                    Login
                </Button>
                <Box
                    sx={{
                        margin: '5% 0 5% 0',
                    }}
                >
                    <Typography ><Link to={"/Signup"} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}> No account ? Create one</Link> </Typography>
                </Box>
            </form>
        </Box>
    )
}
