import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, Link } from 'react-router-dom';
import loginIcon from '../assest/signin.gif';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import ImageToBase64 from '../helper/ImageToBase64';

const defaultTheme = createTheme();


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const[showConfirmPassword , setShowConfirmPassword] = useState(false)
  

  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmpassword: '', 
    profilepic:''
  });

  console.log("the data is about",data)
console.log(data)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);
    setData((pre) => ({
      ...pre,
      profilepic: imagePic
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
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
                onChange={handleUploadImage}
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
                id="userName"
                placeholder="enter your name"
                label="userName"
                name="userName"
                onChange={handleOnChange}
                value={data.userName}
                
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="enter your email"
                id="email"
                label="Email Address"
                name="email"
                onChange={handleOnChange}
                value={data.email}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={data.password}
                placeholder="enter your password"
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
                placeholder="confirm your password"
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
                {"Already have an Account?"}
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
