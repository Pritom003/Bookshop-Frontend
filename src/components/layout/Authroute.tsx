import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
// import { selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Spin } from "antd";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
