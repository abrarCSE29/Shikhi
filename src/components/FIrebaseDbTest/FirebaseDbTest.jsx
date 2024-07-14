import { Box } from '@mui/material'
import React from 'react'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from '../Firebase/FirebaseConfig';


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function FirebaseDbTest() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e.target);
        const { name, email, mobileNumber, password } = e.target;
        console.log(name.value, email.value, mobileNumber.value);
        try {
            const docRef = await addDoc(collection(db, "adminInformation"), {
                name: name.value,
                email: email.value,
                mobileNumber: mobileNumber.value,
                password: password.value,
  
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (
        <Box sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            display: 'block'
        }}>
            <h2>This is a firebaseDbtest</h2>
            <form onSubmit={handleSubmit}>
                <input name='name' type='text' placeholder='Name' /><br></br>
                <input name='email' type='text' placeholder='Email' /><br></br>
                <input name='mobileNumber' type='text' placeholder='Phone' /><br></br>
                <input name='password' type='text' placeholder='Password' /><br></br>
                <input type='submit' value='Register'  />
            </form>
        </Box>
    )
}
