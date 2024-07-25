import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Stack, Badge, Avatar, Tabs, Tab, Menu, MenuItem } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import SummaryApi from '../common/index';
import { setUserDetails } from '../stores/userSlice';
import HeaderDrawer from './HeaderDrawer';
import HeaderResponsiveIcons from './HeaderResponsiveIcons';

// Styled components
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





const Header = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const pages = ["Products", "Services", "Contact Us", "About Us"];

    
    const handleLogout = async () => {
        try {
            const response = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null));
                navigate("/")
            } else if (data.error) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred during logout.");
        }
    };


    return (
        <AppBar sx={{ backgroundColor: "#063970", height:'100px' }}>
            <Toolbar>
                {/* Logo */}
                <Link to="/">
                    <IconButton aria-label="cart">
                        <ShoppingCartIcon style={{ color: 'white' }} />
                    </IconButton>
                </Link>

                {/* Responsive Management */}
                {isMatch ? (
                    <>
                        <Typography sx={{ fontSize: "1.5rem", paddingLeft: "10%" }}>SHOPEE</Typography>
                        <div>
                        <Avatar 
                            src={user?.profilepic || '/broken-image.jpg'}
                            alt={user?.name || 'User Avatar'}
                            sx={{ width: 25, height: 25, marginLeft: '400px' }}
                        
                        />
                        <Menu>
                            <menuitem>admin panel</menuitem>
                        </Menu>
                        </div>
                        <HeaderDrawer />
                        <HeaderResponsiveIcons />
                    </>
                ) : (
                    <>
                        {/* Navigation Tabs */}
                        <Tabs
                            textColor="inherit"
                            onChange={(e, val) => setValue(val)}
                            indicatorColor="secondary"
                            value={value}
                        >
                            {pages.map((page, index) => (
                                <Tab key={index} label={page} />
                            ))}
                        </Tabs>

                        {/* Search Component */}
                        <TextField
                            sx={{
                                margin: '10px',
                                marginLeft: '10px',
                                width: '500px',
                                borderRadius: '30px',
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
                                style: { color: 'white' },
                            }}
                        />

                        {/* Badge Icons */}
                        <Stack direction={'row'} spacing={3} sx={{ marginLeft: '50px' }}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <ShoppingCartIcon style={{ color: 'white' }} />
                                </StyledBadge>
                            </IconButton>
                            <IconButton aria-label="notifications">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <NotificationsIcon style={{ color: 'white' }} />
                                </StyledBadge>
                            </IconButton>
                            <Avatar 
                                src={user?.profilepic || '/broken-image.jpg'} 
                            />
                        </Stack>

                        {/* Auth Button */}
                        <div>
                            {user?._id ? (
                                <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Link to="login">
                                    <Button sx={{ marginLeft: 'auto' }} variant="contained">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </Toolbar>

           
        </AppBar>
    );
};

export default Header;
