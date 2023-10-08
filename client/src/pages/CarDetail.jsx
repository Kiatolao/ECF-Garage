import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
        if (response.data.length > 0) { 
          const carData = response.data[0]; 
          setCar(carData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
  
    fetchCarDetails();
  }, [id]);

  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2">
        <img src={`/upload/${car?.image}`} alt={car.title} className="w-full h-auto" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">{car.title}</h1>
          <p className="text-gray-700">{car.desc}</p>
          <p className="text-lg text-gray-800 mt-4">Année : {car.year}</p>
          <p className="text-lg text-gray-800">Prix : {car.price} €</p>
          <p className="text-lg text-gray-800">Kilométrage : {car.km} km</p>
          <p className="text-lg text-gray-800">Boîte de vitesse : {car.gearbox}</p>
          <p className="text-lg text-gray-800">Garantie : {car.warrant}</p>
          <p className="text-lg text-gray-800">Carburant : {car.fuel}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

