import React from 'react'
import { useState, useContext, useEffect } from 'react';
import garageLogo from '../assets/parrot-logo2.png';
import { Link } from 'react-router-dom';
import  {AuthContext}  from '../context/authContext';
import '../index.css';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOnTop, setIsOnTop] = useState(true);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const { currentUser, logout } = useContext(AuthContext);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolledToTop = window.scrollY === 0;
        setIsOnTop(isScrolledToTop);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <nav
      className={`${
      isOnTop ? 'bg-transparent' : 'bg-stone-800 opacity-90'
      } text-white border-gray-200  z-10 w-full fixed transition-all duration-300`}
    >
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
          <img
            src={garageLogo}
            className={`h-8 ml-5 transition-all duration-500 ${
              isOnTop ? 'scale-150 mt-2' : 'scale-100'
            }`}
            alt="Parrot Logo"
          />
          </a>
          <div className="flex md:order-3">

            
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
            <ul className=" flex flex-col  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
              <li>
                <Link className="font-semibold" to="/">Accueil</Link>
              </li>
              <li>
                <Link className="font-semibold" to="/cars">Occasions</Link>
              </li>
              <li>
                <Link className="font-semibold" to="/contact">Contact</Link>
              </li>
              <li>
                {currentUser &&<Link className="font-bold"  to="/dashboard">Tableau de bord</Link>}
              </li>
              <li>
              
          {currentUser && (
            <>
              <span className="mr-2">{currentUser?.username}</span>
              <span onClick={logout} className="cursor-pointer">| Se déconnecter</span>
            </>
          )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }