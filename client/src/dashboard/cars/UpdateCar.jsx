import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSafetyCertificate, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export const UpdateCar = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // Récupération des données de l'API
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchCars();
  }, [cars]);

  // Fonction pour supprimer une voiture
  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${carId}`, {
          withCredentials: true,
        });
        setCars(cars.filter((car) => car.id !== carId));
      } catch (error) {
        console.error('Erreur lors de la suppression de la voiture :', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      
      {cars.map((car) => (
        
        <div
          key={car.id}
          className="bg-stone-100 shadow-md rounded-md p-4 hover:border-red-500 border border-transparent cursor-pointer">

          <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(`/Edit_car/${car.id}`)}
            className="text-blue-600 hover:text-blue-800 flex items-center">
            <AiOutlineEdit className="mr-1" />
            Editer
          </button>
          <button
            onClick={() => deleteCar(car.id)}
            className="text-red-600 hover:text-red-800 flex items-center">
            <AiOutlineDelete className="mr-1" />
            Supprimer
          </button>

        </div>
        <div className="mb-4 mt-2 border-b border-gray-300"></div>
          <img src={`/upload/${car?.image}`} alt={car.title} className="w-full h-auto" />

          <h2 className="text-lg font-semibold mt-2">{car.title}</h2>
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-600">
              {car.year} |<span style={{ marginRight: '5px' }}></span>
              {car.km} km |<span style={{ marginRight: '5px' }}></span>
              {car.gearbox} |<span style={{ marginRight: '5px' }}></span>
              {car.fuel}
            </p>
          </div>
          <div className="mb-2 mt-2 border-b border-gray-300"></div>
          <div className="flex justify-between items-center">
            <button
              className="flex items-center border border-red-600 text-red-600 text-sm rounded-md px-1  focus:outline-none" disabled>
              <AiOutlineSafetyCertificate className="mr-1" /> Garantie {car.warrant} mois
            </button>
          </div>
          <div className="mb-4 mt-2 border-b border-gray-300"></div>
          <p className="text-lg font-semibold  mt-2">{car.price} €</p>
        </div>

      ))}
    </div>
  );
};

