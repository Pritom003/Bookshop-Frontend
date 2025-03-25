import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ICartItem, removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCreateOrderMutation } from "../../redux/features/Order/orderApi";
import { toast } from "sonner";
import { Button } from "antd";
import { TUser } from "../../redux/features/auth/authSlice";
import { TrashIcon } from "lucide-react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as TUser;
  const cartData = useAppSelector((state) => state.cart);

  console.log("Cart State:", cartData);

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const orderPayload = {
      user: user.id,
      products: cartData.items.map(({ product, quantity }) => ({ product, quantity })),
    };

    console.log("Sending order payload:", orderPayload);
    await createOrder(orderPayload);
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        console.log("Redirecting to:", data.data);
        setTimeout(() => {
          if (typeof data.data === "string") {
            window.location.href = data.data;
          } else {
            console.error("Invalid URL:", data.data);
          }
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <div className="container mx-auto p-5 grid justify-center align-middle items-center">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

      {cartData?.totalQuantity === 0 ? (
        <p>Your cart is empty. <Link to="/books" className="text-blue-600">Browse Books</Link></p>
      ) : (
        <div className="flex-1 overflow-y-auto justify-center align-middle items-center max-w-96 *:first-letter  border-2 border-gray-200 p-4 rounded-md">
          {cartData?.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData?.items.map((item: ICartItem) => (
                <li key={item.product} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          console.log("Decreasing quantity for:", item.product);
                          dispatch(updateQuantity({ id: item.product, quantity: Math.max(item.quantity - 1, 1) }));
                        }}
                        className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
  onClick={() => {
    console.log("Increasing quantity for:", item.product);
    if (item.quantity < item.inStock) {
      dispatch(updateQuantity({ id: item.product, quantity: item.quantity + 1 }));
    }
  }}
  disabled={item.quantity >= item.inStock}
  className={`w-6 h-6 rounded ${item.quantity >= item.inStock ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
>
  +
</button>

                    </div>
                  </div>
                  <span className="grid justify-center align-middle items-center ">
                  <p className="text-sm font-semibold text-gray-800">${(item.quantity * item.price).toFixed(2)}</p>
                  <button onClick={() => dispatch(removeFromCart(item.product))} className="text-red-600 text-sm hover:underline">
                    <TrashIcon size={12}></TrashIcon>
                  </button>
                  </span>
                
                </li>
           
              ))}
                <hr className="border-b text-gray-600 border-gray-900" />
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="border-b my-3"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Total Quantity:</span>
            <span className="text-lg font-bold">{cartData?.totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Total Price:</span>
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
