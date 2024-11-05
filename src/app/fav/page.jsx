'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

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
  const { currentUser } = useAuth(); // Access currentUser from context
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login'; // Redirect to login page if not authenticated
    }
  }, [currentUser]);

  // useEffect to load favourites from localStorage when the component mounts
  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavourites(savedFavourites);
  }, []);

  // Function to remove a Pokémon from favourites
  const removeFromFavourites = (pokemonId) => {
    const updatedFavourites = favourites.filter((pokemon) => pokemon.id !== pokemonId);
    setFavourites(updatedFavourites);
    saveToLocalStorage(updatedFavourites);
  };

  const filteredFavourites = favourites.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Among Favourites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>
      <div id="pokemon-container">
        {favourites.length === 0 ? (
          <div style={styles.noAddMessage}>
            <p>No favourite pokemons added</p>
          </div>
        ) : filteredFavourites.length === 0 ? (
          <div style={styles.noMatchMessage}>
            <p>No favourite Pokémon matching the search.</p>
          </div>
        ) : (
          filteredFavourites.map((data) => {
            const abilities = data.abilities.map((a) => a.ability.name).join(', ');
            const height = data.height / 10; // Height in meters
            const weight = data.weight / 10; // Weight in kg
            return (
              <div key={data.id} className="pokemon">
                <h2>{data.name}</h2>
                <img src={data.sprites.front_default} alt={data.name} />
                <p>Abilities: {abilities}</p>
                <p>Height: {height} m, Weight: {weight} kg</p>
                <button onClick={() => removeFromFavourites(data.id)}>
                  -
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  noAddMessage: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    textAlign: 'center',
    marginTop: '15rem',
  },

  noMatchMessage: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    textAlign: 'center',
    marginTop: '10rem',
  }
}
