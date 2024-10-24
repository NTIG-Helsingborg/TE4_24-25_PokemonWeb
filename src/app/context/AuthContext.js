'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const isAuthenticated = currentUser !== null; // Determine if user is authenticated

  // Register user
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }
    
    const newUser = { email, password }; // Hashing needed in real app
    users.push(newUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    router.push('/login'); // Navigate to the login page after registration
  };

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login successful');
      router.push('/'); // Navigate to the homepage after successful login
    } else {
      alert('Invalid email or password');
    }
  };

  // Log out user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};