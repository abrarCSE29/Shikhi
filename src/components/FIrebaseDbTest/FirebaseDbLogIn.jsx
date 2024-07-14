import { Box } from '@mui/material';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import firebaseConfig from '../Firebase/FirebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function FirebaseDbLogIn() {
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'userInformation'));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUserData(users);
        };

        fetchData();
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let { email, password } = e.target;
        email = email.value;
        password = password.value;
        //console.log(email);
        userData.forEach(user => {
            if (user.email === email && user.password === (password)) {
                setMessage(`Logged in successfully as ${user.name}`);
            }
        })
    };
    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <h1>FirebaseDB Login</h1>
            <form action="" method="get" onSubmit={handleOnSubmit}>
                <input name='email' type="text" placeholder="Email" /><br />
                <input name='password' type="password" placeholder="Password" /><br />
                <button type="submit">Log In</button>
            </form>
            {
                message && <div>{message}</div>
            }
        </Box>
    );
}
