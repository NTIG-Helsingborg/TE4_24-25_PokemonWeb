'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const isAuthenticated = currentUser !== null;

  // Register user
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      alert('Email already registered');
      return;
    }

    const newUser = { email, password }; // Store email instead of username
    users.push(newUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    router.push('/login'); // Redirect to login page after registration
  };

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user)); // Persist user session
      alert('Login successful');
      router.push('/'); // Redirect to the homepage after login
    } else {
      alert('Invalid email or password');
    }
  };

  // Log out user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Clear session on logout
    router.push('/login');
  };

  // On app load, retrieve currentUser from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setCurrentUser(savedUser); // Restore user session on reload
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};