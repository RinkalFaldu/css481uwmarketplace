/*
 * File: Header.jsx
 * Description: This component renders a  header that contains the logo, search bar,
 *              action buttons, and navigation menu.
 *              The header is displayed on every page of the application.
 *              The header also displays the user's name if they are logged in.
 *                                                                               
 * States:
 * - searchQuery (string): The search query entered by the user.
 * - displayName (string): The name of the user if they are logged in.
 * - navigate (function): A function that allows the user to navigate to a different page.
 * - location (object): An object that contains information about the current URL.
 *         
 * Methods:
 * - Header(): This function returns the header component.
 * - useEffect(): This function is used to get the user's name from the database and update the state with the user's name.
 * - handleSearch(e): Handles the search functionality and redirects the user to the search results page.
 * - handleSignOut(): handles sign out and redirects to login page
 *       
 * @author Rinkal Faldu, Gabrielle Omega
 * @version 1.0
 * @since 2025-02-25
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // get user data
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase-config';
import logoImage from '../Assets/website_logo.jpg';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const userSignInState = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.name || user.email);
        } else {
          setDisplayName('No name');
        }
      }
    });
    return userSignInState;
  }, []);

  // signout
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setDisplayName('');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header class="header">
      {/* Top navigation bar */}
      <div class="top-nav">
        {/* Logo */}
        <div class="logo">
          {/* Link to Home page by logo */}
          <Link to="/">
            <img
              src={logoImage}
              alt="market place logo"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div class="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search items"
              class="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

            />
            <button class="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Action buttons */}
        <div class="action-buttons">
          <div class="auth-buttons">

            {displayName ? (
              <>
                <button class="sell-button" onClick={() => navigate('/SellItemPage')}>
                  Sell Items
                </button>

                <button class="signout-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button class="login-button" onClick={() => navigate('/login')}>
                  Log In
                </button>
                <button class="signup-button" onClick={() => navigate('/register')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div class="user-profile" onClick={() => navigate('/UserProfilePage')}>
            <div class="user-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="user-svg">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="username">{displayName || 'Guest'}</span>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav class="main-nav">
        <ul class="nav-menu">
          <li class="nav-item">
            <Link to="/Books">Books</Link>
          </li>
          <li class="nav-item">
            <Link to="/Furniture">Furniture</Link>
          </li>
          <li class="nav-item">
            <Link to="/Electronics">Electronics</Link>
          </li>
          <li class="nav-item">
            <Link to="/Stationery">Stationery</Link>
          </li>
          <li class="nav-item">
            <Link to="/Bags">Bags</Link>
          </li>
          <li class="nav-item">
            <Link to="/LabEquipment">Lab Equipment</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;