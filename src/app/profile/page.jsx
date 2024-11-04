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

  return (
    <div style={styles.container}>
      <div style={styles.profileBox}>
        <h1 style={styles.header}>Your Profile</h1>
        {currentUser && (
          <div style={styles.info}>
            <p>Email: <strong>{currentUser.email}</strong></p>
            <p>You have <strong>{favouriteCount}</strong> favourite Pokémon.</p>
          </div>
        )}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
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
  },
};
