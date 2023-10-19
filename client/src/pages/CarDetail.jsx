import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { Infos } from '../components/Infos';
import layer from '../assets/layer.jpg';


export const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const navigate = useNavigate();

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

  // action au click sur le bouton contact pour changer  l objet du message
  const handleContactClick = () => {
    navigate(`/contact?object=${car.title}`);
  };

  return (
  <>
  <img src={layer} alt="Moteur" className="h-[100px] w-full bg-cover shadow-xl"/>
  <div className="bg-stone container mx-auto mt-20">
    <div className="md:flex md:space-x-4">
      <div className="md:w-1/2">
        <div className="h-80 mx-auto mb-4 shadow-lg">
          <img
            src={`/upload/${car?.image}`}
            alt={car.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2">


        <div className=" border  h-80 shadow">
          <h1 className="text-xl font-semibold p-3 bg-neutral-200">{car.title}</h1>
          <div className="mb-2  border-b border-gray-300"></div>   
          <div className="p-4 rounded space-y-2">
            <p className=" text-lg text-gray-800">Année : {car.year}</p>
            <p className="text-lg text-gray-800">Kilométrage : {car.km} km</p>
            <p className="text-lg text-gray-800">Boîte de vitesse : {car.gearbox}</p>
            <p className="text-lg text-gray-800">Carburant : {car.fuel}</p>
            <div className="mb-2 mt-2 border-b border-gray-300"></div>
            <div className="flex items-center mb-1">
          <VscWorkspaceTrusted size={20} className="mr-2 text-green-500" />
          <p className="text-lg text-gray-800">Garantie : {car.warrant} mois</p>
        </div>
            <div className="mb-2  border-b border-gray-300"></div>
            <p className="text-xl  font-bold text-gray-800">Prix : {car.price} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div className="container mx-auto mt-4">
      <h2 className="p-2 bg-neutral-200 font-semibold text-xl shadow">Information générales</h2>
      <p className="text-gray-700 mt-5">{car.desc}</p>
      <button onClick={handleContactClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Contactez-nous à propos de cette voiture
        </button>
  </div>
    <Infos />
  </>
  );
};

