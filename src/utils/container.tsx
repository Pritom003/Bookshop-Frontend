import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-ful mx-auto px-4 
    sm:px-6 lg:px-2 mt-2 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
