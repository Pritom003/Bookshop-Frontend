import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactPage from "../pages/ContactPage";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import DetailsBook from "../pages/DetailsBook";
import Register from "../pages/Registe";
import ProtectedRoute from "../components/layout/ProtectedRout";

import AddBooks from "../pages/Admin/AddBooks";
import Orderdetails from "../pages/Order/Orderdetails";
import Cart from "../pages/Payment/Cart";
import Checkout from "../pages/Payment/CheckoutPage";
import VerifyOrder from "../pages/Order/VerifyOrder";
import UserTable from "../pages/Admin/UserMangement/UserTable";
import AllProductsTable from "../pages/Admin/Productscontrol/AllProductsTable";
import AdminOrderHistory from "../pages/Admin/OrderMangement/AdminOrderHistory";
import ReveneStats from "../pages/Admin/OrderMangement/ReveneStats";
import Profile from "../pages/Dashboard/Profile";

import ChangePassword from "../pages/ChagnePassword";
import ForgotPassword from "../pages/ForgotPassword";
import AuthRoute from "../components/layout/Authroute";
import MyOrderHistory from "../pages/Dashboard/MyOrderHistory";
import Dashboard from "../pages/Admin/Dashboard";

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
      { path: "/reset-password", element: <ChangePassword /> },
      { path: "/forget-password", element: <ForgotPassword /> },
      { path: "/regi", element: <Register /> },
      { path: "/book/:id", element: <AuthRoute><DetailsBook /></AuthRoute> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order", element: <Orderdetails /> },
      { path: "/order/verify", element: <VerifyOrder /> },
    ],
  },
  {
    path: "/dashboard", // Admin route
    element:<AuthRoute> <Dashboard></Dashboard></AuthRoute>,
    children: [
      { path: "", element: <Profile /> }, // Admin can add books
      { path: "add-book", element: <AddBooks /> }, // Admin can add books
      { path: "myorder", element: <MyOrderHistory/> }, // Admin can add books
      { path: "stats", element:<ProtectedRoute><ReveneStats /></ProtectedRoute>  }, // Admin can add books
      { path: "manage-users", element:<ProtectedRoute><UserTable /></ProtectedRoute>  }, // Admin can add books
      { path: "manage-products", element:<ProtectedRoute><AllProductsTable /></ProtectedRoute>  }, // Admin can add books
      { path: "order-history", element:<ProtectedRoute><AdminOrderHistory /></ProtectedRoute>  }, // Admin can add books
      // Add more admin-specific routes here
    ],
  },
]);

export default router;
