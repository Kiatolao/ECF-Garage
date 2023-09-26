import React from 'react';
import garageImage from '../assets/garage-2.png';
export const Home = () => {
  return (
    <>
<div className="relative">
  <img src={garageImage} alt="" className="" />
  <div className="shadow rounded  ml-6  absolute top-1/2 transform -translate-y-1/2 bg-white h-[350px] w-[300px] p-4 z-10 ">
  
    <ul className="flex flex-col  mt-2">
      <li>Lundi</li>
      <li>Mardi</li>
      <li>Mercredi</li>
      <li>Jeudi</li>
      <li>Vendredi</li>
      <li>Samedi</li>
      <li>Dimanche</li>
    </ul>
  </div>
</div>

    </>
  );
}
