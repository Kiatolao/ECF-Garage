import React, { useState} from 'react'
import Sidebar from '../dashboard/Sidebar'
import Content from '../dashboard/Content'

export const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex">
      <Sidebar onSelectMenuItem={onSelectMenuItem} />
      <Content selectedMenuItem={selectedMenuItem} />
    </div>
  );
};

