import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireShop?: boolean;
}

const LoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-muted-foreground font-body">Chargement...</p>
    </motion.div>
  </div>
);

export function ProtectedRoute({ children, requireShop = true }: ProtectedRouteProps) {
  const { user, shop, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  // Not logged in → redirect to home
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Logged in but no shop and requireShop is true → redirect to create-shop
  if (requireShop && !shop && location.pathname !== "/create-shop") {
    return <Navigate to="/create-shop" replace />;
  }

  // Has shop but trying to access create-shop → redirect to dashboard
  if (shop && location.pathname === "/create-shop") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function CreateShopRoute({ children }: { children: React.ReactNode }) {
  const { user, shop, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Not logged in → redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Already has shop → redirect to dashboard
  if (shop) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
