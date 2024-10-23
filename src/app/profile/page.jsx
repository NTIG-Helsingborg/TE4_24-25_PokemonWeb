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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login'; // Redirect to login page if not authenticated
    }
  }, [currentUser]);

  // useEffect to load the number of favourite Pokémon when the component mounts
  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavouriteCount(savedFavourites.length); // Set the number of favourite Pokémon
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function
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