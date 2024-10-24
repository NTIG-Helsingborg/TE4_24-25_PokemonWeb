'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './context/AuthContext.js';

export default function PokemonList() {
  const { isAuthenticated, currentUser } = useAuth();  // Access both isAuthenticated and currentUser
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  // Check authentication status
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!savedUser) {
      window.location.href = '/login'; // Redirect to login only if no user is found in localStorage
    }
  }, []);

  // Function to fetch Pokémon
  const fetchResult = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  // Fetch all Pokémon data
  const fetchAllPokemons = async () => {
    const pokemonData = [];
    for (let i = 1; i <= 20; i++) {
      const data = await fetchResult(i);
      pokemonData.push(data);
    }
    pokemonData.sort((a, b) => a.name.localeCompare(b.name));
    setPokemons(pokemonData);
  };

  const displayNextBatch = useCallback(() => {
    const nextBatchStart = currentBatch * 5;
    const nextBatchEnd = nextBatchStart + 5;
    const nextBatch = pokemons.slice(nextBatchStart, nextBatchEnd);
    setVisiblePokemons(nextBatch);
    setCurrentBatch((prevBatch) => (prevBatch + 1) % Math.ceil(pokemons.length / 5));
  }, [pokemons, currentBatch]);

  const randomizePokemons = () => {
    const shuffledPokemons = [...pokemons].sort(() => 0.5 - Math.random());
    const randomBatch = shuffledPokemons.slice(0, 5);
    setVisiblePokemons(randomBatch);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      const intervalId = setInterval(() => {
        displayNextBatch();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [pokemons, displayNextBatch]);

  return (
    <div id="pokemon-container">
      <button onClick={randomizePokemons}>Randomize</button>
      {visiblePokemons.map((data) => {
        const abilities = data.abilities.map((a) => a.ability.name).join(', ');
        const height = data.height / 10;
        const weight = data.weight / 10;
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