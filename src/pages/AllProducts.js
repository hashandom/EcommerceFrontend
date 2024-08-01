import React from 'react'
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
const AllProducts = () => {
  return (
    <Container sx={{marginTop:"70px", marginLeft:"15px"}}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Product Image"
              height="200"
              image="https://via.placeholder.com/300"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Product Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of the product goes here. It highlights key features and benefits.
              </Typography>
              <Typography variant="h6" component="div" color="primary" sx={{ mt: 2 }}>
                $99.99
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AllProducts
