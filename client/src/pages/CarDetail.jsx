import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { Infos } from '../components/Infos';
import layer from '../assets/layer.jpg';
import logo2 from '../assets/parrot-logo.png';
import { CarContactForm } from '../components/CarContactForm';
import { AiOutlineCheck } from 'react-icons/ai';
import { SocialMedia } from '../components/Socialmedia';
import { BeatLoader} from 'react-spinners';
import { useMediaQuery } from 'react-responsive';

export const CarDetail = () => {

  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);

  // usecallback pour éviter de relancer la fonction en boucle
  const fetchCarDetails = useCallback(async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cars/${id}`);
        if (response.data.length > 0) { 
          const carData = response.data[0]; 
          setCar(carData);
        }        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données');
      }
  }, [id]);

  useEffect(() => {
    fetchCarDetails();
  }, [fetchCarDetails]);
  
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
      <nav className="flex px-5 md:px-5" aria-label="Breadcrumb">
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
              <Link to="/cars">Occasions</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fillRule="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="text-red-700 font-semibold ml-1 md:ml-2 text-md">{car.title}</span>
            </div>
          </li>
        </ol>
      </nav>
    )}
    </>

  {/* mise  en page des détails du vehicule */}
  <>
  <div className="flex items-center justify-center">
    {loading && <BeatLoader color="rgba(214, 54, 54, 1)" className='pt-10'/>}
  </div>
  <div className='container py-3 md:px-5 mx-auto'>
  <div className=" mt-5">
    <div className="lg:flex md:space-x-4">
      <div className="lg:w-1/2">
        <div className="h-90 mx-auto mb-4 shadow-inner bg-neutral-800 rounded-md">
          <img
            src={car?.image ? car.image.replace('http://', 'https://') : ''}
            alt={car.title}
            className="w-full h-full object-contain md:object-cover rounded-md"
          />
        </div>
      </div>
      <div className="lg:w-1/4 ">
        <div className=" border border-neutral-300 h-90 shadow rounded-md bg-white overflow-auto pb-5">
          <h1 className="text-xl font-semibold p-3 ">{car.title}</h1>
          <div className="mb-2  border-b border-gray-300"></div>   
          <div className="px-4 rounded space-y-2">
            <p className=" text-lg text-gray-800 pt-5"><b>Année :</b> {car.year}</p>
            <p className="text-lg text-gray-800"><b>Kilométrage :</b> {car.km} km</p>
            <p className="text-lg text-gray-800"><b>Boîte de vitesse :</b> {car.gearbox}</p>
            <p className="text-lg text-gray-800"><b>Carburant :</b> {car.fuel}</p>
            <div className="mb-2 mt-2 border-b border-gray-300 pt-6"></div>
            <div className="flex items-center mb-1 ">
          <VscWorkspaceTrusted size={20} className="mr-2 text-green-700" />
          <p className="text-lg text-green-700">Garantie : {car.warrant} mois</p>
        </div>
            <div className="mb-4 border-b border-gray-300"></div>
            <p className="text-xl pt-2 font-bold text-gray-800">Prix : {car.price} €</p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/4">
      <div className="border border-neutral-300 h-90 shadow rounded-md bg-white overflow-auto">
      <h2 className="text-xl font-semibold p-3">Nos garanties</h2>
      <div className="mb-4 border-b border-gray-300"></div>
        <ul className="list-disc pl-5 space-y-5">
          <li className="flex items-start pt-3">
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
          <li className="flex items-start">
            <AiOutlineCheck className="h-5 w-5 text-green-500 mt-1 mr-2" />
            <span>Assistance dépannage 24/7</span>
          </li>
        </ul>
      </div>
     </div>
    </div>
    {car.title && <CarContactForm carTitle={car.title} />}
  </div>
  </div>
  </>
  <Infos />
  </>
  );
};

