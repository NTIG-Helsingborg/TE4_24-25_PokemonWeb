'use client';
import React, { useState, useEffect } from 'react';

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
  const [pokemons, setPokemons] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // Function to fetch a single Pokémon by its ID
  const fetchResult = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  // Function to fetch and display all Pokémon
  const fetchAllPokemons = async () => {
    const pokemonData = [];
    for (let i = 1; i <= 20; i++) {
      const data = await fetchResult(i);
      pokemonData.push(data);
    }
    pokemonData.sort((a, b) => a.name.localeCompare(b.name));
    setPokemons(pokemonData);
  };

  // useEffect to fetch Pokémon and load favourites from localStorage when the component mounts
  useEffect(() => {
    fetchAllPokemons();
    const savedFavourites = getFromLocalStorage();
    setFavourites(savedFavourites);
  }, []);

  // Function to add a Pokémon to favourites
  const addToFavourites = (pokemon) => {
    const newFavourites = [...favourites, pokemon];
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites); // Save to localStorage
  };

  // Function to check if a Pokémon is in favourites
  const isFavourite = (pokemon) => {
    return favourites.some((fav) => fav.id === pokemon.id);
  };

    // Filter favourites based on search term, ensuring it matches the start of the name
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
        <p>No favourite Pokémon matching the search.</p> // Display this if the search returns no results
      ) : (filteredPokemons.map((data) => {
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
            {/* Add button renamed to "+" and disabled if already added */}
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