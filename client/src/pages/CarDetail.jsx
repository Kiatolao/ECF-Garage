import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { Infos } from '../components/Infos';
import layer from '../assets/layer.jpg';
import logo2 from '../assets/parrot-logo.png';
import { CarContactForm } from '../components/CarContactForm';
import { AiOutlineCheck } from 'react-icons/ai';
import { SocialMedia } from '../components/Socialmedia';


export const CarDetail = () => {

  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cars/${id}`);
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
  <SocialMedia />
  <div>
    <img src={layer} alt="Moteur" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80"/>
    <div className="flex-grow border-t border-black"></div>
  </div>
  <div className="relative flex py-3 items-center p-5 pt-5">
      <div className="flex-grow border-t border-red-700"></div>
        <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
      <div className="flex-grow border-t border-red-700"></div>
  </div>

  <div className=" container mx-auto mt-5">
    <div className="md:flex md:space-x-4">
      <div className="md:w-1/2">
        <div className="h-80 mx-auto mb-4 shadow-lg p-3">
          <img
            src={car?.image ? car.image.replace('http://', 'https://') : ''}
            alt={car.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="md:w-1/4 ">
        <div className=" border border-neutral-300 h-80 shadow rounded-md bg-white">
          <h1 className="text-xl font-semibold p-3 ">{car.title}</h1>
          <div className="mb-2  border-b border-gray-300"></div>   
          <div className="px-4 rounded space-y-2">
            <p className=" text-lg text-gray-800"><b>Année :</b> {car.year}</p>
            <p className="text-lg text-gray-800"><b>Kilométrage :</b> {car.km} km</p>
            <p className="text-lg text-gray-800"><b>Boîte de vitesse :</b> {car.gearbox}</p>
            <p className="text-lg text-gray-800"><b>Carburant :</b> {car.fuel}</p>
            <div className="mb-2 mt-2 border-b border-gray-300"></div>
            <div className="flex items-center mb-1">
          <VscWorkspaceTrusted size={20} className="mr-2 text-green-700" />
          <p className="text-lg text-green-700">Garantie : {car.warrant} mois</p>
        </div>
            <div className="mb-4 border-b border-gray-300"></div>
            <p className="text-xl pt-2 font-bold text-gray-800">Prix : {car.price} €</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/4">
      <div className="border border-neutral-300 h-80 shadow rounded-md bg-white">
  <h2 className="text-xl font-semibold p-3">Nos garanties</h2>
    <div className="mb-4 border-b border-gray-300"></div>
        <ul className="list-disc pl-5 space-y-5">
          <li className="flex items-start ">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Véhicule révisé et contrôlé</span>
          </li>
          <li className="flex items-start">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Satisfait ou remboursé</span>
          </li>
          <li className="flex items-start">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Offre de reprise</span>
          </li>
          <li className="flex items-start">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Offre de financement</span>
          </li>
          <li className="flex items-start">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Possibilité d'essai avant achat</span>
          </li>
        </ul>
      </div>
     </div>
    </div>
    {car.title && <CarContactForm carTitle={car.title} />}
  </div>

  <Infos />
  </>
  );
};

