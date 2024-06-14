import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import './Cart.css'
export default function Cart(props) {
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
          <Typography>
            Items
          </Typography>
          {
             props.cartCoures
          }

          <List>
            <ListItem >
              <ListItemText className='hover'>Course 1</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Course 2</ListItemText>
            </ListItem>
          </List>
        </Box>

      </Paper>
    </Box>
  )
}
