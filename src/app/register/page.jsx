'use client'; //Indicates that following code should run on the client-side
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import Link from "next/link";

export default function RegisterPage() {
  //Returns an object containing authentication-related functions and data. In this case, register function from the AuthContext, which will allow users to log in.
  const { register } = useAuth();

  //Holds user's email and password. setEmail and setPassword are functions that update the respective states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    //Calls the login function from the AuthContext, passing in the email and password from the component state. Happens when we submit
  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  //Html code
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Register</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.linkText}>
          {`Already have an account?`} <Link href="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

//Styling
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#333333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    marginTop: '1rem',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  linkText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666666',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};
