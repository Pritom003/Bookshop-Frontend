/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/cartSlice";
// import { clearCart } from "../redux/features/cart/cartSlice";

const Checkout = () => {
  const {  total } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful! Order placed.");
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Checkout</h2>
      <p className="mb-2">Total Amount: <span className="font-bold">${total}</span></p>
      <button onClick={handlePayment} className="px-5 py-2 bg-green-600 text-white rounded-md">Pay Now</button>
    </div>
  );
};
export default Checkout;