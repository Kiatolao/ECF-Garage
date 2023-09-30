import React from 'react';
import garageImage from '../assets/garage-2.png';
export const Home = () => {
  return (
    <>
<div className="relative">
  <img src={garageImage} alt="" className="" />
  
  <div class="md:mb-12 lg:mb-0">
            <div
              class="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
              <iframe
              title="map"
                src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                class="absolute left-0 top-0 h-full w-full rounded-lg"
                frameborder="0"
                allowfullscreen></iframe>
            </div>
          </div>

</div>

    </>
  );
}
