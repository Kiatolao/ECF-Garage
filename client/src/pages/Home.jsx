import React from 'react';
import garageImage from '../assets/garage-2.png';
import { Services } from '../components/Services';
import { Testimonial } from '../components/Testimonial';
import {TestimonialForm} from '../components/TestimonialForm';
import { Infos } from '../components/Infos';
import { AiOutlineRight } from 'react-icons/ai';

export const Home = () => {
  return (
    <>
      <div className="relative">
        <img src={garageImage} alt="Garage" className="w-full" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-30 text-white">
          <h1 className="text-4xl ">Garage Parrot réparations automobiles de confiance depuis 2004</h1>
          <button className="bg-red-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-red-700">
            Demander un service <AiOutlineRight size={17} className="inline-block " />
          </button>
        </div>
      </div>

      <div>
        <Services />
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <TestimonialForm />
      </div>
    <Infos />
    </>
  );
}
