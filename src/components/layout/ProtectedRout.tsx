import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
// import { useCurrentToken, useCurrentUser } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if Redux store has been updated
    setIsLoading(false);
  }, [user, token]);

  if (isLoading) return null; // Wait for Redux state to load

  if (!token || user?.role !== "ADMIN") {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
