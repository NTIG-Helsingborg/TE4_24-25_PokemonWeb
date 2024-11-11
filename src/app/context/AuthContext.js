'use client';  //Indicates that following code should run on the client-side

//Importing functions and hooks
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const AuthContext = createContext(); //AuthContext to hold authentication-related data

export const useAuth = () => useContext(AuthContext); //hook that simplifies the process to access the AuthContext

//AuthProvider wraps around other compontents in order to provide authentication context to them. Children = our components
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //State variable that holds the currently authenticated user (starts at null), setCurrentUser updates the state variable
  const router = useRouter(); // Initialize useRouter for navigation

  const isAuthenticated = currentUser !== null; // Determine if user is authenticated

  // Register user function
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];  //retrieves list of existing users from localStorage
    
    //Checks if the current user already exists by searching for their email. If they do, it alerts and exits.
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }
    
    //If currentUser does not exist, it creates a new user object and adds it to the list.
    const newUser = { email, password }; 
    users.push(newUser);
    
    //The updated user list is then saved back to localStorage.
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    router.push('/TE4_24-25_PokemonWeb/login'); // Navigate to the login page after registration
  };

  // Login user function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];  //Retrieves the existing users from localStorage.
    
    //Checks if the provided email and password match any user in the list
    const user = users.find(user => user.email === email && user.password === password);

    //If a match is found, it updates the currentUser state, saves the user to localStorage
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login successful');
      router.push('/TE4_24-25_PokemonWeb/'); // Navigate to the homepage after successful login
    } else {
      alert('Invalid email or password'); //If no match is found, it alerts the user about the invalid credentials
    }
  };

  // Log out user function
  const logout = () => {
    //Sets the currentUser state back to null and removes the currentUser from localStorage
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  //UseEffect runs after the rendering the component
  useEffect(() => {
    //Checks if there is a saved user in localStorage and sets it as the current user if found
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  /*Passing the current user, authentication status, and authentication functions (register, login, logout) as the context value.
  Now children that are wrapped by AuthProvider can access the authentication context*/
  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};