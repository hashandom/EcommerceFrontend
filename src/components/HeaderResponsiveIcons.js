// import React, { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { styled } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import Badge from '@mui/material/Badge';

// // Define the styled badge
// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//   },
// }));

// const App = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleIconClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton sx={{ color: 'white' }} onClick={handleIconClick}>
//         <MoreVertIcon />
//       </IconButton>
      
//       <Menu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         keepMounted
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>
//           Notification
//           <IconButton aria-label="cart">
//             <StyledBadge badgeContent={4} color="secondary">
//               <ShoppingCartIcon style={{ color: 'black', }} />
//             </StyledBadge>
//           </IconButton>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           My Cart
//           <IconButton aria-label="cart">
//             <StyledBadge badgeContent={4} color="secondary">
//               <ShoppingCartIcon style={{ color: 'black' }} />
//             </StyledBadge>
//           </IconButton>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default App;
