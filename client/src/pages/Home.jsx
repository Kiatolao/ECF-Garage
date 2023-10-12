import React from 'react';
import garageImage from '../assets/garage-2.png';
import { Services } from '../components/Services';
import { Testimonial } from '../components/Testimonial';
import {TestimonialForm} from '../components/TestimonialForm';
import { Infos } from '../components/Infos';

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
