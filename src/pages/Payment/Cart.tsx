
import { Link } from "react-router-dom";
import {useEffect } from "react";
import { ICartItem, removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCreateOrderMutation } from "../../redux/features/Order/orderApi";
import { toast } from "sonner";
import { Button } from "antd";
import { TUser } from "../../redux/features/auth/authSlice";

const Cart = () => {
    const dispatch = useAppDispatch();
    // const token = useAppSelector(useCurrentToken);
    const user = useAppSelector((state) => state.auth.user) as TUser; 
    const cartData = useAppSelector((state) => state.cart);
  console.log(cartData);
    const [createOrder, { isLoading, isSuccess, data, isError, error }] =
      useCreateOrderMutation();
  console.log(data?.data,'sdfd');
      const handlePlaceOrder = async () => {
        const orderPayload = {
          user: user.id,
          products: cartData.items.map(({ product, quantity }) => ({
            product, // ✅ Only sending required fields
            quantity,
          })),
        };
      
        console.log("Sending order payload:", orderPayload); // ✅ Debugging step
      
        await createOrder(orderPayload);
      };
      
    const toastId = "cart";
    useEffect(() => {
      if (isLoading) toast.loading("Processing ...", { id: toastId });
   
      if (isSuccess) {
        toast.success(data?.message, { id: toastId });
        if (data?.data) {
          console.log("Redirecting to:", data.data); // Log the value to inspect
          const timeoutId = setTimeout(() => {
            // Check if it's a valid URL before redirecting
            if (typeof data.data === 'string') {
              window.location.href = data.data;
            } else {
              console.error("Invalid URL in data.data:", data.data);
            }
          }, 1000);
          return () => clearTimeout(timeoutId); // Cleanup on component unmount
        }
      }
   
      if (isError) toast.error(JSON.stringify(error), { id: toastId });
      console.log(error);
    }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);
   
    

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {cartData?.totalQuantity=== 0 ? (
        <p>Your cart is empty. <Link to="/books" className="text-blue-600">Browse Books</Link></p>
      ) : (
        <div className="flex-1 overflow-y-auto">
        {cartData?.items.length > 0 ? (
          <ul className="space-y-4">
            {cartData?.items.map((item :ICartItem ) => (
              <li key={item.product} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product,
                            quantity: Math.max(item.quantity - 1, 1),
                          })
                        )
                      }
                      className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product,
                            quantity: Math.min(
                              item.quantity + 1,
                              Number(item?.stock)
                            ),
                          })
                        )
                      }
                      className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.product))}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        <div className="border-b my-3"></div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Total Quantity:
          </span>
          <span className="text-lg font-bold">{cartData?.totalQuantity}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Total Price:
          </span>
          <span className="text-lg font-bold">
  ${cartData?.totalPrice ? cartData.totalPrice.toFixed(2) : "0.00"}
</span>

        </div>
      </div>

      )}
        <Button className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
    </div>
  );
};
export default Cart;