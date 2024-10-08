import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import './Cart.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
export default function Cart(props) {

  const cartCourses = props.cartCourses;
  //console.log(props);

  const grandTotal = cartCourses.reduce((sum, tmp) => sum + tmp.price, 0);
  const {handleRemoveCourseFromCart} = useContext(UserContext);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/My Cart');
    alert('Checkout Successful!');
  }
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
                      <Box
                        sx={{
                          display : 'flex',
                          justifyContent : 'flex-start',
                          alignItems : 'center'
                        }}
                      >
                        <Box>
                          <Button variant='contained'startIcon={<DeleteIcon/>} onClick={()=>handleRemoveCourseFromCart(course)}>Delete</Button>
                        </Box>
                        
                        <Box>
                        <ListItem >
                          <ListItemText className='bold'>{course.name}</ListItemText>
                        </ListItem>
                      </Box>
                      </Box>
                      
                      <Box>
                        <ListItem >
                          <ListItemText className='bold'>Tk {course.price}</ListItemText>
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
                    variant="h5"
                    color="initial"
                    textAlign={'center'}
                    fontWeight={600}
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
                    Tk {grandTotal}
                  </Typography>
                </Box>
              </Box>
          }
          {
            cartCourses.length === 0?
              <></> :
              <Box
                display={'flex'}
                justifyContent={'center'}
                margin={'2%'}
              >
                <Button variant='contained' color='primary' onClick={handleCheckout}>Checkout</Button>
              </Box>
          }
        </Box>

      </Paper>
    </Box>
  )
}
