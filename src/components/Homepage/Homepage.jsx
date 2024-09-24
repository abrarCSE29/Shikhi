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

  const handleAddCourseToCart = (course) => {
    setCartCourse([...cartCourse, course]);
    setCart([...cart, course]);
  };


  const handleRemoveCourseFromCart = (course) => {
    const newCartCourses = cartCourse.filter(pd => pd.id !== course.id);
    setCartCourse(newCartCourses);
    setCart(newCartCourses);
  };

  return (
    <Box className='container'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {
            allCourses.map((course, index) =>
              <Course key={index} course={course} handleAddCourseToCart={handleAddCourseToCart} />
            )
          }
        </Grid>
        <Grid item xs={4}>
          <Cart cartCourses={cart} handleRemoveCourseFromCart={handleRemoveCourseFromCart} />
        </Grid>
      </Grid>
    </Box>
  );
}
