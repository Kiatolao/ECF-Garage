import React, { useState, useEffect} from 'react'
import {Sidebar} from '../dashboard/menu/Sidebar'
import {Content} from '../dashboard/menu/Content'
import layer from '../assets/layer.jpg'

export const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [isMobile, setIsMobile] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const onSelectMenuItem = (menuItem) => {
      setSelectedMenuItem(menuItem);
      setIsSidebarOpen(false); 
    };

    // mobile mediaquerie
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 767);
      };

      handleResize(); // Check initial screen size

      window.addEventListener('resize', handleResize); // Update on window resize

      return () => {
        window.removeEventListener('resize', handleResize); // Cleanup
      };
    }, []);

  return (
    <>
      <div>
        <img src={layer} alt="Moteur" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80 z-30" />
        <div className="flex-grow border-t border-black"></div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div
          className={`w-full md:w-1/4 fixed md:relative top-[110px] md:top-0 left-0 md:left-auto bg-white h-full overflow-auto ${
            isSidebarOpen ? '' : 'hidden md:block'
          }`}
        >
          <Sidebar onSelectMenuItem={onSelectMenuItem} />
        </div>
          <div className={`w-full md:w-3/4 ${isSidebarOpen ? 'ml-1/4' : ''}
           p-5 ${isMobile ? 'pt-70' : ''}`} onClick={() => setIsSidebarOpen(false)}>
          <Content selectedMenuItem={selectedMenuItem} className="h-full" />
      </div>
      </div>

      <button
        className={`fixed top-[70px] left-0 w-full md:hidden bg-blue-500 shadow text-white py-3`}
        onClick={toggleSidebar}
      >
        Afficher le menu
      </button>
    </>
  );
};

