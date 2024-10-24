'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

// Function to save favourites to localStorage
const saveToLocalStorage = (items) => {
  localStorage.setItem('favourites', JSON.stringify(items));
};

// Function to get favourites from localStorage
const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export default function PokemonList() {
  const { currentUser } = useAuth(); // Access currentUser from context
  const [pokemons, setPokemons] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // Check for persisted session in localStorage and redirect if not authenticated
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!savedUser) {
      window.location.href = '/login'; // Redirect to login page if no user is found in localStorage
    }
  }, []);

  // Fetch Pokémon and load favourites from localStorage when the component mounts
  useEffect(() => {
    const fetchAllPokemons = async () => {
      const pokemonData = [];
      for (let i = 1; i <= 20; i++) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonData.push(await data.json());
      }
      pokemonData.sort((a, b) => a.name.localeCompare(b.name));
      setPokemons(pokemonData);
    };

    fetchAllPokemons();
    const savedFavourites = getFromLocalStorage();
    setFavourites(savedFavourites);
  }, []);

  // Add to favourites function
  const addToFavourites = (pokemon) => {
    const newFavourites = [...favourites, pokemon];
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  const isFavourite = (pokemon) => {
    return favourites.some((fav) => fav.id === pokemon.id);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div id="pokemon-container">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      {filteredPokemons.length === 0 ? (
        <p>No favourite Pokémon matching the search.</p>
      ) : (
        filteredPokemons.map((data) => {
          const abilities = data.abilities.map((a) => a.ability.name).join(', ');
          const height = data.height / 10; // Height in meters
          const weight = data.weight / 10; // Weight in kg
          return (
            <div key={data.id} className="pokemon">
              <h2>{data.name}</h2>
              <img src={data.sprites.front_default} alt={data.name} />
              <p>Abilities: {abilities}</p>
              <p>Height: {height} m, Weight: {weight} kg</p>
              <button
                onClick={() => addToFavourites(data)}
                disabled={isFavourite(data)} // Disable button if already a favourite
              >
                {isFavourite(data) ? '✔' : '+'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
