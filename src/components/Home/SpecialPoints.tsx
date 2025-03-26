
import { Truck, Clock, CreditCard, ShoppingCart } from "lucide-react";

const points = [
  { icon: <Truck size={40} />, title: "Fast Delivery", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { icon: <Clock size={40} />, title: "Open 24 Hour", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { icon: <CreditCard size={40} />, title: "Online Payment", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { icon: <ShoppingCart size={40} />, title: "Online Order", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const SpecialPoints = () => {
  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6  rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:translate-x-1"
          >
            <div className="text-gradient-to-r from-cyan-400 to-cyan-600 mb-4">{point.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
            <p className="text-gray-600">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialPoints;