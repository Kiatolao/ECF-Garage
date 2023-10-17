import React, { useState} from 'react'
import {Sidebar} from '../dashboard/menu/Sidebar'
import {Content} from '../dashboard/menu/Content'

export const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex mt-20">
      <Sidebar onSelectMenuItem={onSelectMenuItem} />
      <Content selectedMenuItem={selectedMenuItem} className="h-full" />
    </div>
  );
};

