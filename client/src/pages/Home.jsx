import React from 'react';
import garageImage from '../assets/garage-2.png';
export const Home = () => {
  return (
    <>
<div className="relative">
  <img src={garageImage} alt="" className="" />
  <div className="shadow rounded  ml-6  absolute top-1/2 transform -translate-y-1/2 bg-white h-[350px] w-[300px] p-4 z-10 ">
  <div class="mapouter"><div className="gmap_canvas justify-center"><iframe title= "map "width="275" height="150" id="gmap_canvas" src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
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
