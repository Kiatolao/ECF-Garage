import React from 'react'
import { useState, useContext } from 'react';
import garageLogo from '../assets/parrot-logo.png';
import { Link } from 'react-router-dom';
import  {AuthContext}  from '../context/authContext';



export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const {currentUser, logout} = useContext(AuthContext)

    return (
      <nav className="bg-white border-gray-200 shadow-md z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src={garageLogo}
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex md:order-2">

            <span className='mr-2'>{currentUser?.username}</span>
              {currentUser ? (
              <span onClick={logout} className='cursor-pointer'>Se deconnecter</span> 
              ) : (
              <Link to="/login">Login</Link>
              )}
            
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/cars">Occasions</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }