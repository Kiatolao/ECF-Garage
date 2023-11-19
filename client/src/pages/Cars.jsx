import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { CarFilter } from '../components/CarFilter';
import { Infos } from '../components/Infos';
import layer from '../assets/layer.jpg';
import logo2 from '../assets/parrot-logo.png';
import { SocialMedia } from '../components/Socialmedia';
import { BeatLoader} from 'react-spinners'; 
import { useMediaQuery } from 'react-responsive';

export const Cars = () =>  {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState([]); 
  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  // function de filtre à améliorer / reprendre les value min/max des voitures existante
  const handleFilterChange = (filters) => {
    if (!filters) {

      filters = {
        km: [],
        price: [],
        year: [],
      };
    }

    const filtered = cars.filter((car) => {
      return (
        car.km >= filters.km[0] &&
        car.km <= filters.km[1] &&
        car.price >= filters.price[0] &&
        car.price <= filters.price[1] &&
        car.year >= filters.year[0] &&
        car.year <= filters.year[1]
      );
    });
    setFilteredCars(filtered);
  };

  //récupération des voitures
  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cars`);
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchCars();
  }, []);

  //afficher/cacher le filtre
  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
    <SocialMedia />
      <img src={layer} alt="fond navbar" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80 "/>
      <div className="flex-grow border-t border-black"></div>
    <div className="relative flex py-3 items-center p-5 pt-5">
      <div className="flex-grow border-t border-red-700"></div>
        <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
      <div className="flex-grow border-t border-red-700"></div>
    </div>

{/* File d'ariane */}
<>
    {!isMobile && (
      <nav className="flex md:px-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <svg className="w-5 h-5 mr-2.5" fillRule="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fillRule="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <p className='text-red-700 font-semibold'>Occasions</p>
            </div>
          </li>
        </ol>
      </nav>
    )}
    </>

    {/* Filtre des voitures */}
    <div className="px-5 pt-5">
    <button 
      className="font-bold py-1 px-4 rounded flex items-center border-neutral-600 border focus:outline-none bg-white"
      onClick={toggleFilterVisibility}>  Filtrer <BsFilter size={25} className="ml-2" />
    </button>
    </div>
    <div className={`filter-container ${filterVisible ? 'visible' : 'hidden'}`}>
      <div className="m-4 ">
        <CarFilter onFilterChange={handleFilterChange} />
      </div>
    </div>

    {/* création de card pour affichier les données voitures */}
    <>
  <div className="flex items-center justify-center">
    {loading && <BeatLoader color="rgba(214, 54, 54, 1)" className='pt-10'/>}
  </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="
            bg-white shadow-md rounded-md p-4 
            hover:border-neutral-300 
            border cursor-pointer 
            hover:shadow-2xl transition duration-300 ease-in-out hover:scale-103"
            onClick={() => navigate(`/car_detail/${car.id}`)}>
            <div className="w-full  h-40 overflow-hidden">
            <img
              src={`${car?.image.replace('http://', 'https://')}`}
              alt={car.title}
              className="w-full h-full object-cover"
            />
            </div>

            <h2 className="text-lg font-semibold mt-2">{car.title}</h2>
            <div className="flex justify-between mt-1">
              <p className="text-sm text-gray-600">
                {car.year} |
                <span style={{ marginRight: '5px' }}></span>
                {car.km} km |
                <span style={{ marginRight: '5px' }}></span>
                {car.gearbox} |
                <span style={{ marginRight: '5px' }}></span>
                {car.fuel}
              </p>
            </div>
            <div className="mb-2 mt-2 border-b border-gray-300"></div>
            <div className="flex justify-between items-center">
              <button
                className="flex items-center border border-red-700 text-red-700 text-sm rounded-md px-1 focus:outline-none"
                disabled
              >
                <AiOutlineSafetyCertificate className='mr-1'/> Garantie {car.warrant} mois
              </button>
            </div>
            <div className="mb-4 mt-2 border-b border-gray-300"></div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold mt-2">{car.price} €</p>
              <button className="text-sm  focus:outline border py-2 px-2 border-neutral-300">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
      <Infos />
  </>
  );
};


