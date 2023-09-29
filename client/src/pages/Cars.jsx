import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Cars = () =>  {
  const [cars, setCars] = useState([]);

 // recuperation des données de l'api
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {cars.map((car) => (
        <div
            key={car.id}
            className="bg-white shadow-md rounded-md p-4 hover:border-red-500 border border-transparent cursor-pointer"
          >
          <img src={car.image} alt={car.title} className="w-full h-auto" />
          <h2 className="text-lg font-semibold mt-2">{car.title}</h2>
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-600">{car.year}</p>
            <p className="text-sm text-gray-600">{car.km} km</p>
          </div>
          <p className="text-lg font-semibold text-blue-600 mt-2">{car.price} €</p>
        </div>
      ))}
    </div>
  );
};


