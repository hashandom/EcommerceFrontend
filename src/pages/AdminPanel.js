import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, Box } from '@mui/material';
import { Home, AccountCircle, Settings } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
const drawerWidth = 250;

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/home');
    }
  }, [user, navigate]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            height: '50vh', // Adjust height if needed
            boxSizing: 'border-box',
            marginTop: "90px", // Adjust top margin if needed
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              {user?.profilepic ? (
                <Avatar src={user?.profilepic || '/broken-image.jpg'} />
              ) : (
                <AccountCircle />
              )}
            </ListItemIcon>
            <ListItemText primary={user?.name} />
            <Typography variant="body2" color="textSecondary">
              Role: {user?.role}
            </Typography>
          </ListItem>

          <ListItem button component={Link} to="all-users">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>

          <ListItem button component={Link} to="all-products">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `5px`, 
          marginTop:'60px'// Margin left to fit the drawer width
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPanel;
