import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assest/signin.gif';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Resizer from 'react-image-file-resizer';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    profilepic: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload and resize
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        'JPEG', // compress format
        80, // quality
        0, // rotation
        (uri) => {
          // Update the state with the base64 image
          setData((prevData) => ({
            ...prevData,
            profilepic: uri,
          }));
        },
        'base64' // output type
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmpassword) {
      toast.error("Password and Confirm Password do not match");
    } else {
      try {
        const response = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const dataResponse = await response.json();
        if (dataResponse.success) {
          toast.success(dataResponse.message);
          navigate("/login");
        } else if (dataResponse.error) {
          toast.error(dataResponse.message);
        }
        console.log("userapi data", dataResponse);
      } catch (error) {
        toast.error("An error occurred during sign up. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '100px' }}>
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label htmlFor="image-upload">
              <Avatar
                sx={{ m: 1, bgcolor: 'secondary.main' }}
                alt="signIn.png"
                src={data.profilepic || loginIcon}
              />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </label>

            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                placeholder="Enter your name"
                label="Name"
                name="name"
                onChange={handleOnChange}
                value={data.name}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Enter your email"
                id="email"
                label="Email Address"
                name="email"
                onChange={handleOnChange}
                value={data.email}
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={data.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                value={data.confirmpassword}
                placeholder="Confirm your password"
                onChange={handleOnChange}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmpassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={'/login'} variant="body2">
                    {'Already have an Account?'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
