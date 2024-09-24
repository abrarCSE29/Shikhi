import { Box, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import './Homepage.css'
import Course from '../Course/Course'
import Cart from '../Cart/Cart'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'; // Optional if using axios

export default function Homepage() {
  const [allCourses, setAllCourses] = useState([]);
  const { cart, setCart } = useContext(UserContext);
  const [cartCourse, setCartCourse] = useState(cart);

  // Fetch courses from the server when the component mounts
  useEffect(() => {
    // Using axios
    axios.get('http://localhost:5000/courses')
      .then(response => {
        setAllCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });

    // Alternatively, you can use fetch
    /*
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => setAllCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
    */
  }, []);

  return (
    <Box className='container'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {
            allCourses.map((course, index) =>
              <Course key={index} course={course} />
            )
          }
        </Grid>
        <Grid item xs={4}>
          <Cart cartCourses={cart} />
        </Grid>
      </Grid>
    </Box>
  );
}
