import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function TopBar({ isAuthenticated, logout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Medical Insurance Price Predictor
        </Typography>
        <IconButton aria-label="home page" color="inherit" href="/">
          <HomeIcon />
        </IconButton>
        {isAuthenticated && <Button color="inherit" href="/update_password">Update Password</Button>}
        {isAuthenticated && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}
