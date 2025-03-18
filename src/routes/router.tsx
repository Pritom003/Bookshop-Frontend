import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactPage from "../pages/ContactPage";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import DetailsBook from "../pages/DetailsBook";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Register from "../pages/Registe";
import ProtectedRoute from "../components/layout/ProtectedRout";
import AddBooks from "../pages/Admin/AddBooks";
import Orderdetails from "../pages/Order/Orderdetails";
// import VerifyOrder from "../pages/Order/VerifyOrder";
import Cart from "../pages/Payment/Cart";
import Checkout from "../pages/Payment/CheckoutPage";
// import VerifyOrder from "../pages/Payment/VerifyOrder";
// import VerifyOrder from "../pages/Payment/VerifyOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/all-books", element: <AllBooks /> },
      { path: "/login", element: <Login /> },
      { path: "/regi", element: <Register/> },
      { path: "/book/:id", element: <DetailsBook /> },
      { path: "/cart", element: <Cart/> },
      { path: "/checkout", element: <Checkout /> },
      // { path: "/checkout", element: <DetailsB /> },
      {
        path: "/order",
        element: <Orderdetails />,
      },
      // {
      //   path: "/order/verify",
      //   element: <VerifyOrder />,
      // },
      {
        path: "/admin",
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
        children: [
          { path: "add-book", element: <AddBooks /> }, // Admin can add books
          // Add more admin-specific routes here
        ],
      },
    ],
  },
]);

export default router;
