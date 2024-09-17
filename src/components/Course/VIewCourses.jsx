import React, { useEffect, useState } from 'react'
// import courses from '../Homepage/courses'
import { Box, Grid } from '@mui/material'
import Course from './Course'
import axios from 'axios';
export default function VIewCourses() {
    const [allCourses, setAllCourses] = useState([]);
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
        <>
            <Box
                className='container'
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            allCourses.map((course,index)=>
                                <Course key={index} course={course}></Course>
                            )
                        }
                    </Grid>
                </Grid>    
            </Box>
        </>
    )
}
