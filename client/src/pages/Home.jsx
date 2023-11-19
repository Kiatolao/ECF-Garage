import React from 'react';

import { Overview } from '../components/Overview';
import { Testimonial } from '../components/TestimonialGR/Testimonial';
import { Infos } from '../components/Infos';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SocialMedia } from '../components/Socialmedia';
import { useWindowWidth } from '@react-hook/window-size';
import '../StutterFix.css'

export const Home = () => {

  const isMobile = useWindowWidth() < 965; 
  return (
    <>
      <div className="p-5 bg-no-repeat bg-center bg-cover  h-screen shadow-xl ">
        <div className="bgfix absolute inset-0 flex flex-col justify-center  items-start  text-white">
          <div className=" max-w-[600px] mx-auto mt-20 bg-black bg-opacity-40 p-8 shadow-xl rounded sm:ml-10 ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl  ">
              <span className="font-bold">Garage Parrot</span> réparations automobiles de confiance depuis <span className="font-bold">2004</span>
            </h1>
            <p className="mt-5">Nous utilisons des marques de pièces automobiles de haute qualité et nous sommes déterminés à rendre vos trajets sur la route sûrs et confortables.</p>
          <div className={`flex ${isMobile ? 'justify-center' : ''}`}>
            <Link to="/contact">
              <button className="bg-red-700 text-white py-2 px-4 mt-8 rounded hover:bg-red-800 shadow-md z-20 focus:outline-none">
                Demander un service <AiOutlineRight size={17} className="inline-block" />
              </button>
            </Link>
          </div>
        </div>
            <div className="fixed right-1 top-1/4 transform -translate-y-1/2 z-30">
            <SocialMedia />
            </div>
        </div>
      </div>
          <div className='bg-white'>
            <Overview />
          </div>
          <div className='bg-white'>
            <Testimonial />
          </div>
            <Infos />
    </>
  );
}
