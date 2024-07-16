import React from 'react';
import { Box, Container, Grid, Link, Tooltip, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Tooltip title='Hashan Creation'>
            <Typography variant="h6" color="text.primary" gutterBottom >
              Design By hashan
            </Typography>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
            <Link href="https://www.facebook.com" color="inherit" sx={{ mx: 1 }}>
              <Facebook />
            </Link>
            <Link href="https://www.twitter.com" color="inherit" sx={{ mx: 1 }}>
              <Twitter />
            </Link>
            <Link href="https://www.instagram.com" color="inherit" sx={{ mx: 1 }}>
              <Instagram />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
