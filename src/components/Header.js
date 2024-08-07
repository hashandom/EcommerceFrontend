import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Stack, Badge, Avatar, Tabs, Tab, Menu, MenuItem, Container } from '@mui/material';
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
import ROLE from '../common/role';

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
    const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    

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
                navigate("/");
            } else if (data.error) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred during logout.");
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the menu and set anchor
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
        navigate('/admin-panel/all-products');
    };

    return (
        <AppBar sx={{ backgroundColor: "#F85606", height: '80px', position:"fixed", width:"full"}}>
            <Toolbar >
            
                {/* Logo */}
                <Link to="/">
                    <IconButton aria-label="cart">
                        <ShoppingCartIcon style={{ color: 'white' }} />
                    </IconButton>
                    <Typography>
                        BuyMe
                    </Typography>
                </Link>

                {/* Responsive Management */}
                 
                    <>
                        {/* Navigation Tabs */}
                       

                        {/* Search Component */}
                        <TextField
                            sx={{
                                
                                margin: '10px',
                                marginLeft: '200px',
                                width: '4000px',
                                borderRadius: '30px',
                                background: 'white',
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
                            placeholder='Search in BuyMe .....'
                            InputProps={{
                                startAdornment: <SearchIcon style={{ color: 'black', marginLeft: '10px' }} />,
                                style: { color: 'black' },
                            }}
                        />
            
                        {/* Badge Icons */}
                        <Container sx={{display: 'flex',flexDirection:'row',justifyContent:"end",gap:2}}>
                        
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={0} color="secondary">
                                    <ShoppingCartIcon style={{ color: 'white' }} />
                                </StyledBadge>
                            </IconButton>
                           
                            {
                                user?.id &&(
                                    <Avatar
                                src={user?.profilepic || '/broken-image.jpg'}
                                onClick={user?.role === ROLE.ADMIN ? handleMenuClick : undefined} // Open the menu on Avatar click if the user is an admin
                            />
                                )
                            }
                            <Avatar
                                src={user?.profilepic || '/broken-image.jpg'}
                                onClick={user?.role === ROLE.ADMIN ? handleMenuClick : undefined} // Open the menu on Avatar click if the user is an admin
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: {
                                        width: '200px',
                                        marginTop: '5px',
                                    },
                                }}
                            >
                                {user?.role === ROLE.ADMIN && (
                                    <MenuItem onClick={handleMenuClose}>Admin Panel</MenuItem>
                                )}
                            </Menu>
                    

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
                        </Container>
                    </>
                
            </Toolbar>
        </AppBar>
    );
};

export default Header;