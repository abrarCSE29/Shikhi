import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useContext } from 'react'
import './Course.css'
import { UserContext } from '../Context/UserContext';

export default function Course(props) {
  //  console.log(props);
  const { name, description, image_url, price } = props.course;
  const {handleAddCourseToCart} = useContext(UserContext);
  return (
    <div>
      <Box
        className='course-container'

      >
        <Box className='margin'>
          <Card sx={{ maxWidth: 'auto' }}  raised>
            <CardMedia
              sx={{ height: 140 }}
              image={image_url}
              title="green iguana"
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {description}
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{color : 'red', fontSize:'xx-large'} }>Only {price} Taka</span>
                  </Typography>
                </Box>
                
              </Box>

            </CardContent>
            <CardActions>
              <Button size="large" variant='contained' onClick={()=>handleAddCourseToCart(props.course)}>Add to cart</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </div>
  )
}
