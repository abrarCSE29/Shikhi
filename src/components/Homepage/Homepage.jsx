import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import './Homepage.css'
import Course from '../Course/Course'
import Cart from '../Cart/Cart'
import courses from './courses'
export default function Homepage() {

  //const [allcourse,setAllCourses] = useState([]);
  
  const [cartCourse, setCartCourse] = useState([]);

  const handleAddCourseToCart = (course) => {
    setCartCourse([...cartCourse,course]);
  }
  console.log(cartCourse);

  return (
    <Box
      className='container'
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {
            courses.map((course, index) =>
              <Course key={index} course={course} handleAddCourseToCart={handleAddCourseToCart}></Course>
            )
          }
        </Grid>
        <Grid item xs={4}>
          <Cart cartCourses = {cartCourse}></Cart>
        </Grid>
      </Grid>


    </Box>
  )
}
