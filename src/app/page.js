
"use client";

import React, { useState } from "react";


export default function App() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          {["Home", "List", "Favourites"].map((item, index) => (
            <li
              key={index}
              style={styles.navItem}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <a
                href="#"
                style={{
                  ...styles.navLink,
                  ...(hoverIndex === index ? styles.navLinkHover : {}),
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    transition: "all 0.3s ease", // Smooth transition for hover effect
  },
  navLinkHover: {
    color: "#f1c40f", // Change to a different color on hover
    transform: "scale(1.1)", // Slightly enlarge the button
  },
};



/*
ny mapp i utforskaren
cmd git clone







*/