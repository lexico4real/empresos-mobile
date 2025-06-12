import { authService } from "@/services/auth.service";
import React, { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadInitialAuth();
  }, []);

  const loadInitialAuth = async () => {
    try {
      const token = await authService.loadToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error loading token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetIsAuthenticated = async (value: boolean) => {
    try {
      if (value) {
        // If setting to authenticated, ensure token exists
        const token = await authService.loadToken();
        if (!token) {
          throw new Error("No token found");
        }
      } else {
        // If setting to unauthenticated, clear token
        await authService.signOut();
      }
      setIsAuthenticated(value);
    } catch (error) {
      console.error("Error updating auth state:", error);
      setIsAuthenticated(false);
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated: handleSetIsAuthenticated,
    isLoading,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
