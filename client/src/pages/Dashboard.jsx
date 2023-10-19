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
  <img src={layer} alt="Moteur" className="h-[140px] w-full bg-cover shadow-xl"/>
    <div className="flex mt-20">
      <Sidebar onSelectMenuItem={onSelectMenuItem} />
      <Content selectedMenuItem={selectedMenuItem} className="h-full" />
    </div>
    </>
  );
};

