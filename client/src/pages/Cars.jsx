import React, { useState, useEffect } from 'react';

export const Cars = () =>  {
  const [cars, setCars] = useState([]);

  // Effect pour récupérer les données des voitures depuis l'API Node.js
  useEffect(() => {
    fetch('http://localhost:8000/api/cars') // Assurez-vous d'utiliser le chemin correct pour votre API
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Erreur lors de la récupération des données :', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {cars.map((car) => (
        <div key={car.id} className="bg-white shadow-md rounded-md p-4">
          <img src={car.image} alt={car.title} className="w-full h-auto" />
          <h2 className="text-lg font-semibold mt-2">{car.title}</h2>
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-600">{car.year}</p>
            <p className="text-sm text-gray-600">{car.km} km</p>
          </div>
          <p className="text-sm text-gray-700 mt-2">{car.desc}</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">{car.price} €</p>
        </div>
      ))}
    </div>
  );
};


