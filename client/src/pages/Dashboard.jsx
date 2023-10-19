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
      <img src={layer} alt="Moteur" className="h-[80px] w-full bg-cover shadow-xl bg-opacity-80"/>
      <div className="flex-grow border-t border-black"></div>
    </div>
    <div className="flex mt-5">
      <Sidebar onSelectMenuItem={onSelectMenuItem} />
      <Content selectedMenuItem={selectedMenuItem} className="h-full" />
    </div>
    </>
  );
};

