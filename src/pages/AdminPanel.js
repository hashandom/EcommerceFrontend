import React, { useEffect } from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, AccountCircle, Settings, ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 250;

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          height: 'calc(100vh - 400px)', // Adjust height as needed
          boxSizing: 'border-box',
          marginTop: "90px", // Adjust top margin if needed
        },
      }}
    >
      <div>
        <List>
        <ListItem button >
        <ListItemIcon>
      {user?.profilepic ? (
        <Avatar
          src={user?.profilepic || '/broken-image.jpg'}
          // Add any additional props or handlers here, like onClick for opening the menu
        />
      ) : (
        <AccountCircle />
      )}
    </ListItemIcon>

            <ListItemText primary={user?.name} />
          </ListItem>
          <ListItem button >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default AdminPanel;
