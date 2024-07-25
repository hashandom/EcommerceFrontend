import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/route';
import { Provider } from 'react-redux'
import { store } from './stores/store';
import './index.css'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
     <Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
 
);

