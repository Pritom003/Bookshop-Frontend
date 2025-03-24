import React from "react";
import { Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import logoAnimation from "../../assets/animation/logo.json";
const Footers = () => {
  return (
    <div
      className="bg-cover bg-center text-black p-10 "
      style={{ backgroundImage: "url('/src/assets/images/4872987.jpg')" }} // Update the path if needed
    >
      {/* Logo and Description */}
      <div className=" flex items-center mx-auto mr-9 justify-center h-10">
          <Lottie animationData={logoAnimation} loop className="w-28 h-20" />
          <span className="whitespace-nowrap text-lg font-sans text-primary font-semibold md:block">
            Chapters & Co.
          </span>
        </div>

  <div className="flex flex-wrap items-center justify-between lg:px-24">

          {/* Email Subscription */}
          <div className="text-center mb-6">
        
        <div className="flex justify-center gap-2">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            prefix={<MailOutlined />} 
            className="md:w-64 w-44" 
          />
          <Button className="bg-white border-3">Subscribe</Button>
        </div>
      </div>

      {/* Important Links */}
      <div className="text-center mb-6">
        
        <ul className="flex justify-center gap-4">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/books" className="hover:text-gray-300">All Books</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
      </div>
      {/* Horizontal Line */}
      <hr className="border-gray-400 my-4" />

      {/* Copyright */}
      <div className="text-center text-sm opacity-80">
        &copy; {new Date().getFullYear()} Chapters & Co. All rights reserved.
      </div>
    </div>
  );
};

export default Footers;
