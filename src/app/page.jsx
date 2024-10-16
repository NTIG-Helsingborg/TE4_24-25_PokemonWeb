'use client';
import React, { useState, useEffect, useCallback } from 'react';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  // Function to fetch a single Pokémon by its ID
  const fetchResult = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  // Function to fetch all Pokémon and set state
  const fetchAllPokemons = async () => {
    const pokemonData = [];

    // Fetch Pokémon data for IDs 1 to 45
    for (let i = 1; i <= 20; i++) {
      const data = await fetchResult(i);
      pokemonData.push(data);
    }

    // Sort Pokémon by name
    pokemonData.sort((a, b) => a.name.localeCompare(b.name));

    // Update the state with the fetched and sorted data
    setPokemons(pokemonData);
  };

  // Function to display Pokémon in batches of 5
  const displayNextBatch = useCallback(() => {
    const nextBatchStart = currentBatch * 5;
    const nextBatchEnd = nextBatchStart + 5;
    const nextBatch = pokemons.slice(nextBatchStart, nextBatchEnd);
    
    setVisiblePokemons(nextBatch);

    // Update to the next batch; reset to 0 if we've reached the end of the list
    setCurrentBatch((prevBatch) => (prevBatch + 1) % Math.ceil(pokemons.length / 5));
  }, [pokemons, currentBatch]);

  // Randomize button functionality
  const randomizePokemons = () => {
    const shuffledPokemons = [...pokemons].sort(() => 0.5 - Math.random());
    const randomBatch = shuffledPokemons.slice(0, 5);
    setVisiblePokemons(randomBatch);
  };

  // useEffect to fetch all Pokémon on mount
  useEffect(() => {
    fetchAllPokemons();
  }, []);

  // Timer effect to update visiblePokemons every 5 seconds
  useEffect(() => {
    if (pokemons.length > 0) {
      // Start the timer
      const intervalId = setInterval(() => {
        displayNextBatch();
      }, 5000);

      // Cleanup timer on component unmount
      return () => clearInterval(intervalId);
    }
  }, [pokemons, displayNextBatch]);

  return (
    <div id="pokemon-container">
      <button onClick={randomizePokemons}>Randomize</button>

      {visiblePokemons.map((data) => {
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
          </div>
        );
      })}
    </div>
  );
}