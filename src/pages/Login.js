import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'
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
import { Link  } from 'react-router-dom'
import loginIcon from '../assest/signin.gif'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context/index';

const defaultTheme = createTheme();


const Login = ()=> {

  const navigate = useNavigate();
  const {fetchUserDetails,fetchUserAddToCart}  = useContext(Context);

  
  // password state change//////////////////////////////////////
  const [showPassword , setShowPassword] = useState(true)
  // password state change///////////////////////////////////

  // get userinput and print  console////////////////
  const[data , setData] = useState({
    email : "",
    password : ""
  })
  
  const handleOnChange = (e) => {
    const { name, value } = e.target; // Corrected the typo in value
  
    setData((pre) => {
      return {
        ...pre,
        [name]: value
      };
    });
  };

  console.log(data);
  // get userinput and print  console/////////////////////


  // form handle submit
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(summaryApi.login.url, {
      method: summaryApi.login.method,
      credentials:'include',//This ensures cookies are sent with cross-origin requests
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();
    console.log("userapi data", dataResponse)
    if(dataResponse.sucess){
      toast.success(dataResponse.message)
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }else if(dataResponse.error){
      toast.error(dataResponse.message)
    }
   
  }
  


  // form handle submit

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{marginTop:'100px'}}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}
            alt='signIn.png'
            src= {loginIcon}
          />
            
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleOnChange}
              value={data.email}
               autoComplete="email"
              autoFocus
            />
            <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      value={data.password}
      onChange={handleOnChange}
      label="Password"
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={(event) => {
                setShowPassword((prev)=>{
                  setShowPassword(!prev);
                });
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
          
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
            <Grid item xs>
              <Link to={'/forgotpassword'} variant="body2">
                ForgotPassword?
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/signup'} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Login;