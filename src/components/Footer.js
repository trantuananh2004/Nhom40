import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Features
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Pricing
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Documentation
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                About
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Blog
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Careers
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Privacy
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Terms
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Security
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 