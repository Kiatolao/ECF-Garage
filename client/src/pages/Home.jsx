import React from 'react';
import garageImage from '../assets/garage-3.jpg';
import { Overview } from '../components/Overview';
import { Testimonial } from '../components/TestimonialGR/Testimonial';
import { Infos } from '../components/Infos';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const Home = () => {
  const divStyle = {
    backgroundImage: `url(${garageImage})`,
    backgroundAttachment: 'fixed', 
  };
  return (
    <>
<div style={divStyle} className="p-5 bg-no-repeat bg-center bg-cover h-screen shadow-lg">
    <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-20 text-white">
      <div className="max-w-[500px] ml-10 mt-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl  ">
        <span className="font-bold">Garage Parrot</span> réparations automobiles de confiance depuis <span className="font-bold">2004</span>
      </h1>
      <p className="mt-5">Nous utilisons des marques de pièces automobiles de haute qualité et nous sommes déterminés à rendre vos trajets sur la route sûrs et confortables.</p>
      </div>
      <Link to="/contact">
      <button className="bg-red-700 text-white py-2 px-4 mt-8 rounded hover:bg-red-800 ml-10 shadow-md">
        Demander un service <AiOutlineRight size={17} className="inline-block" />
      </button>
      </Link>
  </div>
</div>
    <div>
      <Overview />
    </div>
    <div>
      <Testimonial />
    </div>
      <Infos />
    </>
  );
}
