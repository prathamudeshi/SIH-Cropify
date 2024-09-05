import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userToken: string | null;
  setUserToken: (token: string | null) => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userToken: null,
  setUserToken: () => {},
});

// Define the props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap around the parts of your app that need access to the context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userToken, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
