import React from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                component="img"
                src="/logo.svg"
                alt="Logo"
                sx={{ height: 32, mr: 2 }}
              />
            </RouterLink>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              component={RouterLink} 
              to="/login"
              variant="outlined"
              sx={{ 
                minWidth: 100,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Log in
            </Button>
            <Button 
              component={RouterLink} 
              to="/register"
              variant="contained"
              sx={{ 
                minWidth: 100,
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
