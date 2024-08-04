// import React, { useState } from 'react';
// import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Button } from '@mui/material'
// const HeaderDrawer = () => {
//     const [openDrawer, setOpenDrawer] = useState(false);

//     const toggleDrawer = () => {
//         setOpenDrawer(!openDrawer);
//     };

//     const handleClose = () => {
//         setOpenDrawer(false);
//     };

//     const pages = ["Products", "Services", "About us", "Contact Us", "Login", "Logout"];

//     return (
//         <>
//             <Drawer 
//                 open={openDrawer} 
//                 onClose={handleClose}
//             >
//                 <List>
//                     {pages.map((page, index) => (
//                         <ListItemButton onClick={handleClose} key={index}>
//                             <ListItemIcon>
//                             <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={handleClose}>
//                             <ListItemText sx={{ color: 'green' }}>{page}</ListItemText>
//                             </Button>
//                             </ListItemIcon>
//                         </ListItemButton>
//                     ))}
//                 </List>
//             </Drawer>
//             <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={toggleDrawer}>
//                 <MenuIcon />
//             </IconButton>
//         </>
//     );
// };

// export default HeaderDrawer;
