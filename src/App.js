import React, { useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common/index';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './stores/userSlice';
function App() {
  const dispatch = useDispatch();

  const fetchUserDetails  = async ()=>{
    const dataResponse = await fetch(summaryApi.current_user.url,{
      method: summaryApi.current_user.method,
      credentials:'include',//This ensures cookies are sent with cross-origin requests
    })
    const  dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("user details",dataApi)
  }

  useEffect(()=>{
    fetchUserDetails();
  },[])

  return (
    <Context.Provider value={{ fetchUserDetails }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
    
      <Header />
      <ToastContainer/>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
    </Context.Provider>
  );
}

export default App;
