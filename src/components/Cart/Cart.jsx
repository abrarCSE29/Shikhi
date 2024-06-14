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
      <Paper elevation={8} className='padding'>
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

          {
            cartCourses.length === 0 ?
              <Typography textAlign={'center'}>
                Your cart is empty
              </Typography> :

              cartCourses.map((course, index) =>
                <Box >
                  <List key={index} >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                    >
                      <Box>
                        <ListItem >
                          <ListItemText className='bold'>{course.name}</ListItemText>
                        </ListItem>
                      </Box>
                      <Box>
                        <ListItem >
                          <ListItemText className='bold'>{course.price}</ListItemText>
                        </ListItem>
                      </Box>
                    </Box>

                    {
                      cartCourses.length === 0 ?
                        <></> :
                        <hr></hr>
                    }
                  </List>
                </Box>
              )
          }
          {
            cartCourses.length === 0 ?
              <></> :
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                margin={'2%'}
              >
                <Box>
                  <Typography
                  >
                    Total
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    color="initial"
                    textAlign={'center'}
                    fontWeight={600}
                  >
                    {props.total}
                  </Typography>
                </Box>
              </Box>
          }


        </Box>

      </Paper>
    </Box>
  )
}
