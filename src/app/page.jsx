'use client';
import "./globals.css";
import React, { useState, useEffect, useCallback } from 'react';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  const fetchResult = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

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
    <div>
     

      <div id="pokemon-container">
        {visiblePokemons.map((data) => {
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
      <div className="button-container">
        <button onClick={randomizePokemons}>Randomize</button>
      </div>
    </div>
  );
}
