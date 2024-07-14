import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { colors, InputAdornment, Stack, Tab, TextField, Toolbar ,Typography,useMediaQuery,useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import HeaderDrawer from './HeaderDrawer';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import HeaderResponsiveIcons from './HeaderResponsiveIcons';
import { Link } from 'react-router-dom';


const Header = () => {
    const[value , setValue] = useState(0);

    {/*reponsive manage */}
    const theme = useTheme();
    console.log(theme)
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    {/*reponsive manage */}


    const pages = ["Products","Services","Contact Us","AboutUs"]

    {/* all badge styling */}
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
        '&:hover .MuiBadge-badge': {
        border: `2px solid white`, // Change border color on hover
    },
    }));
    {/* all badge styling */}


    return (
        <>
            <AppBar sx={{ backgroundColor: "#063970" }}>
                <Toolbar>
                    <Link to = {'/'}>
                    {/* logo design */}
                    <IconButton aria-label="cart">
                    <ShoppingCartIcon style={{color:'white'}} />
                    </IconButton>
                    </Link>
                     {/* logo design */}
                    {
                      
                    // responsive management //////////////////////////////
                        isMatch ? (
                            <>
                            <Typography sx={{fontSize:"1.5rem",paddingLeft:"10%"}}>SHOPEE</Typography>
                             {/* reponsive icons manage */}
                            
                            
                            <Avatar src="/broken-image.jpg"  sx={{ width: 24, height: 24 , marginLeft:'400px' }}/>
                            <HeaderDrawer/>
                            <HeaderResponsiveIcons/>
                            
                            {/* reponsive icons manage */}
                            </>
                        ):(
                            <>
                            <Tabs 
                                textColor="inherit" 
                                onChange={(e,val)=>{setValue(val)}} 
                                indicatorColor="secondary"
                                value={value}
                                
                            >
                        {/*reponsivness management  */}


                         {/*iterate the items uisng array  */}
                                {
                                    pages.map((page , index)=>(
                                        <Tab key={index} label={page}/>
                                    ))
                                }
                         {/*iterate the items uisng array  */}       
                         </Tabs>


                            {/*search component */}
                            <TextField
                                sx={{
                                    margin: '10px',
                                    marginLeft: '10px',
                                    width: '500px',  // Adjust width as needed
                                    borderRadius: '30px',  // Increase border radius for more oval shape
                                    background: '#333',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#555',
                                            borderRadius: '30px', 
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#888',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00bcd4',
                                        },
                                    },
                                }}
                                variant='outlined'
                                placeholder='Search .....'
                                InputProps={{
                                    startAdornment: <SearchIcon style={{ color: 'white', marginLeft: '10px' }} />,
                                    style: { color: 'white' }, // This will change the color of the placeholder text
                                }}
                            />
                            {/*search component */}
                           
                           

                            {/*all badge icons componets */}
                             <Stack direction={'row'} spacing={3} sx={{ marginLeft:'50px'}}>
                                <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <ShoppingCartIcon style={{color:'white'}} />
                                </StyledBadge>
                                </IconButton>
                                <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <NotificationsIcon style={{color:'white'}} />
                                </StyledBadge>
                                </IconButton>
                                <Avatar src="/broken-image.jpg" />
                                </Stack>
                            {/*all badge icons componets */}


                             <Link to = {'login'}>  
                            <Button sx={{ marginLeft: 'auto' }} variant="contained">Login</Button>
                            </Link> 
                            <Link to ={'signup'}>
                            <Button sx={{ marginLeft: '10px' }} variant="contained">Sign Up</Button>
                            </Link>
                            </>
                        )
                        
                    }

                    
                    
                </Toolbar>
             
            </AppBar>
        </>
    );
}

export default Header;
