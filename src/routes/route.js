import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      {path:'signup' , element:<Logout/>}
    ]
  },
 
]);

export default router;
