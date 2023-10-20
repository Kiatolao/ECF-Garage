import React, { useState} from 'react'
import {Sidebar} from '../dashboard/menu/Sidebar'
import {Content} from '../dashboard/menu/Content'
import layer from '../assets/layer.jpg'

export const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>


  <div>
    <img src={layer} alt="Moteur" className="h-[80px] w-full bg-cover shadow-xl bg-opacity-80 z-30" />
    <div className="flex-grow border-t border-black"></div>
  </div>
  <div className="flex">
  <div className="w-1/4 flex flex-col">
    <Sidebar onSelectMenuItem={onSelectMenuItem} />
  </div>
  <div className="w-3/4  p-5 flex flex-grow">
    <Content selectedMenuItem={selectedMenuItem} className="h-full" />
  </div>
</div>

    </>
  );
};

