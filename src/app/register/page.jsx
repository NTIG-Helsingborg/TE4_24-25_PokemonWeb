'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState(''); // Use email instead of username
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" // Set input type to email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link href="/login">Login here</Link></p>
    </div>
  );
}