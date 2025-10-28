// src/components/Layout.jsx
import React from "react";
import "./Layout.css";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
   
    <div className="layout-container">
      <Navbar />
      {children}
      <footer className="app-footer">
        <p>© 2025 TicketApp — All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
