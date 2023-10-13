import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineRight } from 'react-icons/ai';
import working from '../assets/working.jpg';
import working2 from '../assets/working2.jpg';
import working5 from '../assets/working5.jpg';
import working4 from '../assets/working4.jpg';


export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // récuperation des services 
    async function fetchServices() {
      try {
        const response = await axios.get('http://localhost:8000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des services :', error);
      }
    }

    fetchServices();
  }, []);

  return (
    <>
      <div className="p-5 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-bold mb-4">Services proposés par le garage</h2>
        <ul className="list-disc pl-6">
          {services.map((service) => (
            <li key={service.id} className="mb-2">{service.service}</li>
          ))}
        </ul>
      </div>
      <div className=" flex flex-col md:flex-row bg-neutral-200 p-3 shadow-md ">
        <div class="grid grid-cols-2 gap-1 max-w-[600px] mx-auto pt-1">
          <div>
              <img class="h-auto max-w-full rounded" src={working5} alt=""/>
          </div>
          <div>
              <img class="h-auto max-w-full rounded" src={working} alt=""/>
          </div>
          <div>
              <img class="h-auto max-w-full rounded" src={working2} alt=""/>
          </div>
          <div>
              <img class="h-auto max-w-full rounded" src={working4} alt=""/>
          </div>
      </div>
      <div className="max-w-[400px] mx-auto">
          <h2 className="text-2xl font-bold mb-5 text-red-600">Un garage à votre service</h2>
          <p className="mb-4 text-justify">
            <p>Depuis 2004, notre équipe de professionnels qualifiés assure des réparations de confiance et propose une sélection soignée de véhicules d'occasion de qualité. <br/>Nous offrons un service complet, de la réparation à l'achat, en mettant l'accent sur la satisfaction du client.</p>  <br/> Chez Garage Parrot, la fiabilité, l'expertise et l'engagement sont au cœur de notre approche. Faites confiance à notre garage pour prendre soin de votre véhicule et vous guider dans le choix de votre prochaine voiture.
          </p>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mb-5 mt-5">Bouton Rouge <AiOutlineRight size={17} className="inline-block" /></button>
      </div>
    </div>
    </>
  );
};


