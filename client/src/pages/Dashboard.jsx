import React, { useState} from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

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

