import { Box, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import './Homepage.css'
import Course from '../Course/Course'
import Cart from '../Cart/Cart'
import courses from './courses'
import { UserContext } from '../Context/UserContext'
export default function Homepage() {

  //const [allcourse,setAllCourses] = useState([]);
  
 
  const {cart,setCart} = useContext(UserContext);
  const [cartCourse, setCartCourse] = useState(cart);
  console.log(cart);
  const handleAddCourseToCart = (course) => {
    setCartCourse([...cartCourse,course]);
    setCart([...cart,course]);
  };

  const handleRemoveCourseFromCart = (course) =>{
    const newCartCourses = cartCourse.filter(pd => pd.id !== course.id);
    setCartCourse(newCartCourses);
    setCart(newCartCourses);
  };
  // console.log(cartCourse);

  return (
    <Box
      className='container'
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {
            courses.map((course, index) =>
              <Course key={index} course={course} handleAddCourseToCart={handleAddCourseToCart} ></Course>
            )
          }
        </Grid>
        <Grid item xs={4}>
          <Cart cartCourses = {cartCourse} handleRemoveCourseFromCart={handleRemoveCourseFromCart}></Cart>
        </Grid>
      </Grid>
    </Box>
  )
}
