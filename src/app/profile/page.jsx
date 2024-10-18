'use client';
import React, { useState, useEffect } from 'react';

// Function to get favourites from localStorage
const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export default function Profile() {
  const [favouriteCount, setFavouriteCount] = useState(0); // State to store the number of favourite Pokémon

  // useEffect to load the number of favourite Pokémon when the component mounts
  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavouriteCount(savedFavourites.length); // Set the number of favourite Pokémon
  }, []);

  return (
    <div id="profile-container">
      <h1>Your Profile</h1>
      <p>You have {favouriteCount} favourite Pokémon.</p> {/* Display the number of favourite Pokémon */}
    </div>
  );
}