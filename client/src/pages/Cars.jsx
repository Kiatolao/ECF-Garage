import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { CarFilter } from '../components/CarFilter';
import { Infos } from '../components/Infos';
import layer from '../assets/layer.jpg';
import logo2 from '../assets/parrot-logo.png';


export const Cars = () =>  {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState([]); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterChange = (filters) => {
    if (!filters) {

      filters = {
        km: [0, 300000],
        price: [0, 50000],
        year: [2000, 2023],
      };
    }

    if (!cars || !Array.isArray(cars)) {
      return;
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

  useEffect(() => {
    async function fetchCars() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cars`);
        setCars(response.data);
        setFilteredCars(response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchCars();
  }, []);

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
    <div className="">
      <img src={layer} alt="fond navbar" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80"/>
      <div className="flex-grow border-t border-black"></div>
    </div>
    <div className="relative flex py-3 items-center p-5 pt-5">
      <div className="flex-grow border-t border-red-700"></div>
        <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
      <div className="flex-grow border-t border-red-700"></div>
    </div>
    <div className="pl-5 pr-5 ">
    <button 
      className="font-bold py-1 px-4 rounded flex items-center border-neutral-700 border focus:outline-none"
      onClick={toggleFilterVisibility}>  Filtrer <BsFilter size={25} className="ml-2" />
    </button>
    </div>

    <div className={`filter-container ${filterVisible ? 'visible' : 'hidden'}`}>
      <div className="mb-4 ">
        <CarFilter onFilterChange={handleFilterChange} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-md rounded-md p-4 hover:border-neutral-300 border cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate(`/car_detail/${car.id}`)}
          >
            <div className="w-full  h-40 overflow-hidden">
            <img
              src={`${car?.image}`}
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
      <Infos />
  </>
  );
};


