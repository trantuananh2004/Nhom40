import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center',
        py: { xs: 8, md: 12 },
        mb: { xs: 8, md: 12 }
      }}>
        <Typography
          variant="h1"
          sx={{
            mb: 4,
            background: 'linear-gradient(45deg, #fff 30%, #888 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Modern Authentication
          <br />
          for Modern Apps
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          Secure, passwordless authentication that's easy to implement and delightful to use.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ minWidth: 200 }}
          >
            View Documentation
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Passwordless
              </Typography>
              <Typography color="text.secondary">
                Eliminate passwords and provide a seamless authentication experience for your users.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Secure
              </Typography>
              <Typography color="text.secondary">
                Built with security in mind, using industry-standard protocols and best practices.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Easy to Integrate
              </Typography>
              <Typography color="text.secondary">
                Simple API and SDKs for all major platforms. Get started in minutes.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
