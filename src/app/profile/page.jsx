'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';

const getFromLocalStorage = () => {
  const storedFavourites = localStorage.getItem('favourites');
  return storedFavourites ? JSON.parse(storedFavourites) : [];
};

export default function Profile() {
  const { logout, currentUser } = useAuth();
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [fontSize, setFontSize] = useState(16); // State to store font size

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login';
    }
  }, [currentUser]);

  useEffect(() => {
    const savedFavourites = getFromLocalStorage();
    setFavouriteCount(savedFavourites.length);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  // Functions to adjust font size
  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () => setFontSize((prevSize) => Math.max(10, prevSize - 2)); // Minimum font size of 10

  return (
    <div style={styles.container}>
      <div style={styles.profileBox}>
        <h1 style={{ ...styles.header, fontSize: `${fontSize + 8}px` }}>Your Profile</h1>
        {currentUser && (
          <div style={{ ...styles.info, fontSize: `${fontSize}px` }}>
            <p>Email: <strong>{currentUser.email}</strong></p>
            <p>You have <strong>{favouriteCount}</strong> favourite Pokémon.</p>
          </div>
        )}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <div style={styles.fontSizeControls}>
          <button onClick={increaseFontSize} style={styles.fontSizeButton}>+</button>
          <button onClick={decreaseFontSize} style={styles.fontSizeButton}>-</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  profileBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#fff',
  },
  info: {
    fontSize: '1.1rem',
    color: '#fff',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  logoutButton: {
    padding: '0.75rem',
    backgroundColor: '#ded806',
    color: '#ffffff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  fontSizeControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '1rem', 
  },
  fontSizeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#ded806',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
