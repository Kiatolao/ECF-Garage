import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

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
  <>
  <div className="bg-stone-100 container mx-auto mt-6 p-4">
    <div className="md:flex md:space-x-4">
      <div className="md:w-1/2">
        <div className="h-80 mx-auto mb-4">
          <img
            src={`/upload/${car?.image}`}
            alt={car.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="flex items-center mb-1">
          <VscWorkspaceTrusted size={30} className="mr-2 text-green-500" />
          <p className="text-lg text-gray-800">Garantie : {car.warrant} mois</p>
        </div>
        <div className="mb-2 mt-2 border-b border-gray-300"></div>
        <div className="bg-stone-100">
          <h1 className="text-2xl font-semibold p-2">{car.title}</h1>
          <div className="mb-2 mt-2 border-b border-gray-300"></div>
          <div className="p-4 rounded space-y-2">
            <p className="bg-stone-200 text-lg text-gray-800">Année : {car.year}</p>
            <p className="text-lg text-gray-800">Kilométrage : {car.km} km</p>
            <p className="bg-stone-200 text-lg text-gray-800">Boîte de vitesse : {car.gearbox}</p>
            <p className="text-lg text-gray-800">Carburant : {car.fuel}</p>
            <div className="mb-2 mt-2 border-b border-gray-300"></div>
            <p className="text-xl pt-3 font-bold text-gray-800">Prix : {car.price} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/*   <div className="m-5">
      <h2 className="bg-stone-100 text-xl">Description</h2>
      <p className="text-gray-700">{car.desc}</p>
  </div> */}

  </>
  );
};

