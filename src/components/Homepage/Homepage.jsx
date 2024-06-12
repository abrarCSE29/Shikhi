import { Box, Grid } from '@mui/material'
import React from 'react'
import './Homepage.css'
import Course from '../Course/Course'
import Cart from '../Cart/Cart'
export default function Homepage() {
  return (
    <Box
      className='container'
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Course></Course>
        </Grid>
        <Grid item xs={4}>
          <Cart></Cart>
        </Grid>
      </Grid>
      
      
    </Box>
  )
}
