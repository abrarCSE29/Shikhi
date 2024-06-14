import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import './Cart.css'
export default function Cart(props) {

  const cartCourses = props.cartCourses;
  console.log(props);
  return (
    <Box
      className='cart-container'
    >
      <Paper elevation={5}>
        <Box
          sx={{
            margin: '2%'
          }}
        >
          <Typography
            variant="h5"
            color="initial"
            textAlign={'center'}
            fontWeight={600}
          >
            My Cart
          </Typography>
          {/* <Typography>
            Items
          </Typography> */}

          {
            cartCourses.length === 0 ?
              <Typography textAlign={'center'}>
                Your cart is empty
              </Typography> :

              cartCourses.map((course, index) =>
                <List key={index}>
                  <ListItem >
                    <ListItemText className='hover'>{course.name}</ListItemText>
                  </ListItem>
                </List>
              )

          }

        </Box>

      </Paper>
    </Box>
  )
}
