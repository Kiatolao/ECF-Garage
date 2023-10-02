import React from 'react';
import garageImage from '../assets/garage-2.png';
import { Schedules } from '../components/Schedules';

export const Home = () => {
  return (
    <>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-1 absolute z-0">
          <img src={garageImage} alt="Garage" className="w-full" />
        </div>

        {/* Carte et horaires */}
        <div className="md:col-span-1 lg:col-span-2 z-10 mt-5 ml-5">
          <div className="max-w-md bg-white shadow-lg  overflow-hidden">
            {/* Carte Google Maps intégrée dans un iframe */}
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
      </div>

    </>
  );
}
