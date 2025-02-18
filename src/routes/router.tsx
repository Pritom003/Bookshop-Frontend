import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import ContactPage from '../pages/ContactPage';
import AllBooks from '../pages/AllBooks';
import Login from '../pages/Login';
import Register from '../pages/Register';
const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
     
        children:  [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About/>,
            },
            {
                path: '/contact',
                element: <ContactPage />,
            },
            {
                path: '/all-books',
                element: <AllBooks />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/regi',
                element: <Register />,
            },
        ]
    
    },
  ]);
  export default router;