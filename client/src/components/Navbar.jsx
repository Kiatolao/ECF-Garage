import React from 'react'
import { useState, useContext, useEffect } from 'react';
import garageLogo from '../assets/parrot-logo2.png';
import { Link } from 'react-router-dom';
import  {AuthContext}  from '../context/authContext';
import '../index.css'; 
import { useWindowWidth } from '@react-hook/window-size';
import { CiLock } from "react-icons/ci";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOnTop, setIsOnTop] = useState(true);  
    const { currentUser, logout } = useContext(AuthContext);

    const toggleMenu = () => {
      setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };
    const handleLinkClick = () => {
      setIsMenuOpen(false);
    };

    // state qui verifira quand l'ecran est en haut
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

    //mediaquerie
    const isMobile = useWindowWidth() < 965; 

    return (
      <nav
      //condition: sur mobile la barre de navigation sera opaque/ en desktop elle sera transparente onTop et opaque quand on scrollera
      className={`${
      isMobile ? 'bg-stone-800 opacity-95' :
      isOnTop  ? 'bg-transparent text-xl' : 'bg-stone-800 opacity-95 text-xl'
      } text-white  border-gray-200 w-full z-20  fixed transition-all duration-300`}
    >
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
          <img
            src={garageLogo}
            className={`h-8 ml-5 transition-all duration-500 ${
              isMobile ? 'scale-100' :
              isOnTop ? 'scale-150 mt-2' : 'scale-100'
            }`}
            alt="Parrot Logo"
          />
          </a>
          <div className="flex md:order-3">

            
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-md text-sm text-white md:hidden hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
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
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
            <ul className="flex flex-col space-y-3 p-4  ml-auto md:space-y-0  md:p-0 mt-4 border border-stone-700  rounded-md  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
              <li>
                <Link className="font-semibold " to="/" onClick={handleLinkClick}>Accueil</Link>
              </li>
              <li>
                <Link className="font-semibold" to="/cars" onClick={handleLinkClick}>Occasions</Link>
              </li>
              <li>
                <Link className="font-semibold " to="/contact" onClick={handleLinkClick}>Contact</Link>
              </li>
              <li>
                {currentUser &&<Link className="font-semibold "  to="/dashboard " onClick={handleLinkClick}>Tableau de bord</Link>}
              </li>
              <div className="mb-2 mt-2 border-b border-gray-300"></div>
              <li className="md:absolute md:right-5">
              {currentUser ? (
                <div>
                  <span className="mr-2">{currentUser?.username}</span>
                  <span onClick={logout} className="cursor-pointer">
                    | Déconnexion
                  </span>
                </div>
              ) : (
            <Link className="text-sm flex items-center max-w-[150px] justify px-3 py-1 bg-red-700 rounded-md hover:bg-red-800" to="/login">
              <span>Espace réservé</span>
              <CiLock className="ml-2" />
            </Link>
              )}
            </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }