import React from "react";
import { ShoppingCart, CreditCard, Clipboard, Package } from "lucide-react";

const steps = [
  { icon: <ShoppingCart size={40} />, title: "Add to Cart", description: "Browse through our selection of books and add your desired books to the cart." },
  { icon: <Clipboard size={40} />, title: "Add Info Card", description: "Enter your delivery details and payment information to proceed with the order." },
  { icon: <CreditCard size={40} />, title: "Confirm Order", description: "Review your order and confirm the details before making the payment." },
  { icon: <Package size={40} />, title: "Wait for Delivery", description: "Sit back and relax while we process your order and deliver the book to your doorstep." },
];

const HowToBuyBook = () => {
  return (
    <div className="py-16 px-4 bg-gray-100">
        <h1 className="text-center font-sans text-3xl my-10"> How To Buy Books Online</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:translate-x-1"
          >
            <div className="text-gradient-to-r from-cyan-400 to-cyan-600 mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToBuyBook;
