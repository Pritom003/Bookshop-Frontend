/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import { useVerifyOrderQuery } from "../../redux/features/Order/orderApi";
// import { PaymentDetails } from "../../types/types.paymentDetails";  // Assuming interface is in this file

interface PaymentDetails {
  address: string;
  amount: number;
  bank_status: string;
  bank_trx_id: string;
  card_holder_name: string;
  card_number: string;
  city: string;
  currency: string;
  customer_order_id: string;
  date_time: string;
  disc_percent: number;
  discsount_amount: number | null;
  email: string;
  id: number;
  invoice_no: string;
  is_verify: number;
  method: string;
  name: string;
  order_id: string;
  payable_amount: number;
  phone_no: string;
  received_amount: string;
  sp_code: string;
  sp_message: string;
  transaction_status: string | null;
  usd_amt: number;
  usd_rate: number;
  value1: any;
  value2: any;
  value3: any;
  value4: any;
}

const VerifyOrder = () => {
  const fullUrl = window.location.href;
  const correctedUrl = fullUrl.replace("?source=", "&source=");  // Fixing the URL params
  const urlParams = new URLSearchParams(correctedUrl.split("?")[1]);
  const orderId = urlParams.get("order_id");

  const { isLoading, data: orderDatas } = useVerifyOrderQuery(orderId, {
    skip: !orderId,
    refetchOnMountOrArgChange: true,
  });
console.log(orderDatas?.data);
  if (isLoading) return <Spin size="large" />;
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg border border-gray-300 text-center">
        <h2 className="text-2xl font-bold mb-6">Payment Receipt</h2>

        {/* If orderDatas is not empty, map over it */}
        {
          orderDatas?.data.map((orderData: PaymentDetails) => (
            <div key={orderData.id}>
              <div className="text-sm text-gray-700 space-y-3 border-b pb-4">
                <p><strong>Order ID:</strong> {orderData.order_id || "N/A"}</p>
                <p><strong>Date:</strong> {new Date(orderData.date_time).toLocaleString() || "N/A"}</p>
                <p><strong>Status:</strong> {orderData.bank_status || "N/A"}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-3 border-b pb-4 mt-4">
                <h3 className="font-semibold">Payment Details</h3>
                <p><strong>Method:</strong> {orderData.method || "N/A"}</p>
                <p><strong>Amount:</strong> BDT {orderData.payable_amount?.toFixed(2) || "0.00"}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-3 border-b pb-4 mt-4">
                <h3 className="font-semibold">Customer Info</h3>
                <p><strong>Name:</strong> {orderData.name || "N/A"}</p>
                <p><strong>Email:</strong> {orderData.email || "N/A"}</p>
                <p><strong>Phone No:</strong> {orderData.phone_no || "N/A"}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-3 border-b pb-4 mt-4">
                <h3 className="font-semibold">Shipping Info</h3>
                <p><strong>Address:</strong> {orderData.address || "N/A"}</p>
                <p><strong>City:</strong> {orderData.city || "N/A"}</p>
              </div>

              <div className="flex items-center justify-center mt-6">
                {orderData.bank_status === "Success" ? (
                  <span className="flex items-center text-green-600 text-lg font-semibold">
                    <CheckCircle className="mr-1" /> {orderData.sp_message || "Success"}
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 text-lg font-semibold">
                    <AlertCircle className="mr-1" /> {orderData.sp_message || "Failed"}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center mt-6">
                {orderData.is_verify === 1 ? (
                  <span className="flex items-center text-green-600 text-lg font-semibold">
                    <CheckCircle className="mr-1" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-600 text-lg font-semibold">
                    <AlertCircle className="mr-1" /> Not Verified
                  </span>
                )}
              </div>
            </div>
          ))}
       

        <Link to="/" className="block mt-6">
          <Button type="primary" className="w-full font-semibold py-2 rounded-md">View Orders</Button>
        </Link>
      </Card>
    </div>
  );
};

export default VerifyOrder;
