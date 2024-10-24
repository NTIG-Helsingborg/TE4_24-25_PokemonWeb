import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav style={navStyle}>
            <ul style={ulStyle}>
              <li style={liStyle}>
                <Link href={"/"} style={linkStyle}>
                  Home
                </Link>
              </li>
              <li style={liStyle}>
                <Link href={"/list"} style={linkStyle}>
                  List
                </Link>
              </li>
              <li style={liStyle}>
                <Link href={"/fav"} style={linkStyle}>
                  Favourite
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "#000", // Slightly lighter for a softer feel
  color: "#fff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  borderRadius: "8px", // Adds rounded corners for a smoother look
};

const ulStyle = {
  listStyle: "none",
  display: "flex",
  gap: "0.5rem", // More spacing for better separation
  padding: 0,
  margin: 0,
};

const liStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  padding: "0.5rem 1rem", // Adding padding for a better click area
  transition: "color 0.3s, transform 0.3s", // Added transition for hover effect
  borderRadius: "4px", // Rounded edges for buttons
};

// Add CSS to your global CSS file or use inline styling for hover effects:
const linkHoverStyle = {
  ":hover": {
    color: "#FF6347", // Change to a light coral color when hovered
    transform: "scale(1.05)", // Slightly increase the size when hovered
    backgroundColor: "#555", // Change the background color for visual feedback
  },
};
