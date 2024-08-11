import React, { useEffect, useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common/index';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './stores/userSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: 'include', // This ensures cookies are sent with cross-origin requests
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // You can add a toast notification here if needed
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(summaryApi.addToCartProductCount.url, {
        method: summaryApi.addToCartProductCount.method,
        credentials: 'include', // This ensures cookies are sent with cross-origin requests
      });
      const dataApi = await dataResponse.json();

      console.log('Count data API:', dataApi);
      setCartProductCount(dataApi.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      // You can add a toast notification here if needed
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Header />
        <ToastContainer
        position='top-center'
         />
        <Box component="main" sx={{ flexGrow: 1, py: 2, paddingTop: 2 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Context.Provider>
  );
}

export default App;
