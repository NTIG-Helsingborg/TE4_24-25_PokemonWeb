'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js'; // Import useAuth from context

// Function to get favourites from localStorage
const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export default function Profile() {
  const { logout, currentUser } = useAuth(); // Access the logout function and currentUser
  const [favouriteCount, setFavouriteCount] = useState(0); // State to store the number of favourite Pokémon

  // Check localStorage for saved session and redirect if not authenticated
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!savedUser) {
      window.location.href = '/login'; // Redirect to login page if no user is found in localStorage
    }
  }, []);

  // useEffect to load the number of favourite Pokémon when the component mounts
  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavouriteCount(savedFavourites.length); // Set the number of favourite Pokémon
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function
    localStorage.removeItem('currentUser'); // Clear the saved user session
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <div id="profile-container">
      <h1>Your Profile</h1>
      <p>You have {favouriteCount} favourite Pokémon.</p> {/* Display the number of favourite Pokémon */}
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}