'use client';
import React, { useState, useEffect } from 'react';

// Function to get favourites from localStorage
const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

// Function to save favourites to localStorage
const saveToLocalStorage = (items) => {
  localStorage.setItem('favourites', JSON.stringify(items));
};

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // useEffect to load favourites from localStorage when the component mounts
  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavourites(savedFavourites);
  }, []);

  // Function to remove a Pokémon from favourites
  const removeFromFavourites = (pokemonId) => {
    const updatedFavourites = favourites.filter((pokemon) => pokemon.id !== pokemonId);
    setFavourites(updatedFavourites);
    saveToLocalStorage(updatedFavourites); // Update localStorage with the new favourites list
  };

    // Filter favourites based on search term, ensuring it matches the start of the name
  const filteredFavourites = favourites.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div id="favourites-container">
      <h1>Your Favourite Pokémon</h1>
      <input
        type="text"
        placeholder="Search Favourites..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      {/* Check if favourites is empty */}
      {favourites.length === 0 ? (
        <p>No favourite pokemons added</p> // Display this if there are no favourites
      ) : filteredFavourites.length === 0 ? (
        <p>No favourite Pokémon matching the search.</p> // Display this if the search returns no results
      ) : (
        filteredFavourites.map((data) => {
            console.log(data);
          const abilities = data.abilities.map((a) => a.ability.name).join(', ');
          const height = data.height / 10; // Height in meters
          const weight = data.weight / 10; // Weight in kg
          return (
            <div key={data.id} className="pokemon">
              <h2>{data.name}</h2>
              <img src={data.sprites.front_default} alt={data.name} />
              <p>Abilities: {abilities}</p>
              <p>Height: {height} m, Weight: {weight} kg</p>
              {/* Remove button renamed to "-" */}
              <button onClick={() => removeFromFavourites(data.id)}>
                -
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}