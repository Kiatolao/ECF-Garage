import React from 'react';
import garageImage from '../assets/garage-2.png';
import { Schedules } from '../components/Schedules';
import { Services } from '../components/Services';

export const Home = () => {
  return (
    <>
      <div className="relative ">
        <div className="md:col-span-2 lg:col-span-1 z-0">
          <img src={garageImage} alt="Garage" className="w-full" />

        </div>
      </div>

      <div>
        <Services />
      </div>

      <div className="md:col-span-1 lg:col-span-2 z-10 mt-5 ml-5">
  <div className="max-w-md bg-white shadow-lg  overflow-hidden">

    <iframe
      title="map"
      src="https://maps.google.com/maps?q=manhattan&t=&z=13&ie=UTF8&iwloc=&output=embed"
      className="h-64 w-full"
      frameBorder="0"
      allowFullScreen
    ></iframe>

    <Schedules /> 

  </div>
  </div>

    </>
  );
}
