import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      {path:"forgotpassword", element:<ForgotPassword/>},
      {path:"signup", element:<SignUp/>},
      {path:"admin-panel", element:<AdminPanel/>},
    ]
  },
 
]);

export default router;
