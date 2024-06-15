import React from 'react'
import courses from '../Homepage/courses'
import { Box, Grid } from '@mui/material'
import Course from './Course'
export default function VIewCourses() {
    return (
        <>
            <Box
                className='container'
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            courses.map((course,index)=>
                                <Course key={index} course={course}></Course>
                            )
                        }
                    </Grid>
                </Grid>    
            </Box>
        </>
    )
}
