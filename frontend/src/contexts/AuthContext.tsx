import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: number; email: string; fullName: string };
type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
