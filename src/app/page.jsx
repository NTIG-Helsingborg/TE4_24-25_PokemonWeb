'use client'; //Indicates that following code should run on the client-side
import "./globals.css";
import React, { useState, useEffect, useCallback } from 'react';

export default function PokemonList() {
  const { isAuthenticated } = useAuth(); //Used to get the isAuthenticated property, which indicates if a user is logged in.
 
  //State variabler
  const [pokemons, setPokemons] = useState([]);  //Holds the full list of Pokémon data.
  const [visiblePokemons, setVisiblePokemons] = useState([]); //Holds the Pokémon data to be currently displayed.
  const [currentBatch, setCurrentBatch] = useState(0); //Keeps track of the current "batch" (group) of Pokémon being displayed.

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login'; // Redirect to login page if not authenticated
    }
  }, [isAuthenticated]);

  // Asynchronous function to fetch Pokémon by id from the PokéAPI
  const fetchResult = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  // Fetch all Pokémon data using a loop to call fetchResult
  const fetchAllPokemons = async () => {
    const pokemonData = [];
    for (let i = 1; i <= 20; i++) {
      const data = await fetchResult(i);
      pokemonData.push(data);
    }

    //After fetching, it sorts the Pokémon alphabetically by name
    pokemonData.sort((a, b) => a.name.localeCompare(b.name));
    setPokemons(pokemonData); //Updates the pokemons state with the sorted data, making it ready for display.
  };

  //Defines how to display the next batch of 5 Pokémon.
  const displayNextBatch = useCallback(() => { //Only re-computes if pokemons or currentBatch changes.

    //nextBatchStart and nextBatchEnd are calculated based on currentBatch.
    const nextBatchStart = currentBatch * 5;
    const nextBatchEnd = nextBatchStart + 5;
    const nextBatch = pokemons.slice(nextBatchStart, nextBatchEnd); //nextBatch holds the sliced array of 5 Pokémon
    setVisiblePokemons(nextBatch);

    //currentBatch is updated to cycle through the available batches by using the remainder operator %
    setCurrentBatch((prevBatch) => (prevBatch + 1) % Math.ceil(pokemons.length / 5));
  }, [pokemons, currentBatch]);

  //Randomizes the list of pokemons to display a random set of 5 Pokémon
  const randomizePokemons = () => {
    //Copies pokemons, shuffles it, and slices the first 5 items to display
    const shuffledPokemons = [...pokemons].sort(() => 0.5 - Math.random()); 
    const randomBatch = shuffledPokemons.slice(0, 5);
    setVisiblePokemons(randomBatch); //Updates visiblePokemons with the random batch, allowing a refresh of displayed Pokémon
  };

  //Calls fetchAllPokemons() to populate pokemons with data fetch
  useEffect(() => {
    fetchAllPokemons();
  }, []);

  /*Sets up a 5-second interval to call displayNextBatch if pokemons has been loaded. Every 5 seconds, it cycles to the next batch of Pokémon.
  When the component unmounts, clearInterval ensures the interval is cleaned up, preventing memory leaks. */
  useEffect(() => {
    if (pokemons.length > 0) {
      const intervalId = setInterval(() => {
        displayNextBatch();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [pokemons, displayNextBatch]);

  //Html code
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
