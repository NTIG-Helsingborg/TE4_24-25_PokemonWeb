'use client'; //Indicates that following code should run on the client-side

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

// Function to save favourites to localStorage
const saveToLocalStorage = (items) => {
  localStorage.setItem('favourites', JSON.stringify(items));
};

// Function to get favourites from localStorage, if no data is found, it returns an empty array.
const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export default function PokemonList() {
  const { currentUser } = useAuth(); // Access currentUser from context
  const [pokemons, setPokemons] = useState([]); // State to hold the list of fetched Pokémon
  const [favourites, setFavourites] = useState([]); //State to hold the list of favourite Pokémon
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login'; // Redirect to login page if not authenticated
    }
  }, [currentUser]);

  // Fetch Pokémon and load favourites from localStorage when the component mounts
  useEffect(() => {

    //An async function that fetches Pokémon data from an API, sorts it by name, and updates the pokemons state
    const fetchAllPokemons = async () => {
      const pokemonData = [];
      for (let i = 1; i <= 20; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        pokemonData.push(data);
      }
      pokemonData.sort((a, b) => a.name.localeCompare(b.name));
      setPokemons(pokemonData);
    };

    fetchAllPokemons();
    const savedFavourites = getFromLocalStorage();
    setFavourites(savedFavourites);
  }, []);

  // Add to favourites function, updates the favourites state, and saves the new list to localStorage
  const addToFavourites = (pokemon) => {
    const newFavourites = [...favourites, pokemon];
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  //Checks if a Pokémon is already in the favourites list.
  const isFavourite = (pokemon) => {
    return favourites.some((fav) => fav.id === pokemon.id);
  };

  //Filters the list of Pokémon based on the searchTerm. It only includes Pokémon whose names start with the search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  //Html code
  return (
    <div>
      {/* Search Bar Container */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Pokémon List Container */}
      {filteredPokemons.length === 0 ? (
        <div style={styles.noMatchMessage}>
          <p>No favourite Pokémon matching the search</p>
        </div>

      ) : (
        <div id="pokemon-container">{
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
        }</div>
      )}
    </div>
  );
}

//Styling
const styles = {
  noMatchMessage: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    textAlign: 'center',
    marginTop: '5rem',
    marginLeft: '50rem',
    marginRight: '50rem',
  },
};