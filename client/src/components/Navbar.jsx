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
    console.log(logout)
    return (
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src={garageLogo}
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            >
              Get started
            </button>
            
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
              <span className='mr-2'>{currentUser?.username}</span>
              {currentUser ? (
              <span onClick={logout}>Logout</span> 
              ) : (
              <Link to="/login">Login</Link>
              )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }