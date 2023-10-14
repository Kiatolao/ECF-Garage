import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import working from '../assets/working.jpg';
import working2 from '../assets/working2.jpg';
import working5 from '../assets/working5.jpg';
import working4 from '../assets/working4.jpg';
import { Services } from '../components/services/Services';

export const Overview = () => {

  return (
    <>
      <Services />
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
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mb-5 mt-5">Rencontrez-nous <AiOutlineRight size={17} className="inline-block" /></button>
      </div>
    </div>
    </>
  );
};


