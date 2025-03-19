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
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddBooks from "../pages/Admin/AddBooks";
import Orderdetails from "../pages/Order/Orderdetails";
import Cart from "../pages/Payment/Cart";
import Checkout from "../pages/Payment/CheckoutPage";
import VerifyOrder from "../pages/Order/VerifyOrder";
import UserTable from "../pages/Admin/UserMangement/UserTable";

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
      { path: "/regi", element: <Register /> },
      { path: "/book/:id", element: <DetailsBook /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order", element: <Orderdetails /> },
      { path: "/order/verify", element: <VerifyOrder /> },
    ],
  },
  {
    path: "/dashboard", // Admin route
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
    children: [
      { path: "add-book", element: <AddBooks /> }, // Admin can add books
      { path: "manage-users", element: <UserTable /> }, // Admin can add books
      // Add more admin-specific routes here
    ],
  },
]);

export default router;
