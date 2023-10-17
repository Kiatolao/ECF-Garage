import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { CarFilter } from '../components/CarFilter';
import { Infos } from '../components/Infos';
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
        gearbox: 'Manuelle',
        fuel: 'Essence',
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
        car.year <= filters.year[1] &&
        car.gearbox === filters.gearbox &&
        car.fuel === filters.fuel 
      );
    });

    setFilteredCars(filtered);
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
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
    <div className="relative flex py-3 items-center pl-5 pr-5 pt-5">
      <div className="flex-grow border-t border-red-600"></div>
        <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
      <div className="flex-grow border-t border-red-600"></div>
    </div>

    <div className="pl-5 pr-5">
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
            className="bg-stone-100 shadow-md rounded-md p-4 hover:border-neutral-400 border cursor-pointer hover:shadow-xl transition duration-300 ease-in-out "
            onClick={() => navigate(`/car_detail/${car.id}`)}
          >
            <div className="w-full  h-40 overflow-hidden">
              <img src={`/upload/${car?.image}`} alt={car.title} className="w-full h-full object-cover" />
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
                className="flex items-center border border-green-600 text-green-600 text-sm rounded-md px-1 focus:outline-none"
                disabled
              >
                <AiOutlineSafetyCertificate className='mr-1'/> Garantie {car.warrant} mois
              </button>
            </div>
            <div className="mb-4 mt-2 border-b border-gray-300"></div>
            <p className="text-lg font-semibold mt-2">{car.price} €</p>
          </div>
        ))}
      </div>
      <Infos />
  </>
  );
};


