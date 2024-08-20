import { PropsWithChildren } from "react";
import { useAuthStore } from "../stores/auth.store";
import { Navigate } from "react-router-dom";

type ProtectedRouteChildren = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteChildren) => {
  const isAuth = useAuthStore((set) => set.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
