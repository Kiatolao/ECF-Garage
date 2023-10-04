import React from 'react';
import {Register} from '../admin/Register';
import {CarTable} from '../list/CarTable';
import {AddCar} from '../cars/AddCar';
import {Messages} from '../customers/Messages';
import {ScheduleEditor} from '../admin/ScheduleEditor';
import {ServiceEditor} from '../admin/ServiceEditor';

const Content = ({ selectedMenuItem }) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'ajouter-employe':
        return <Register />;
      case 'voir-messages':
        return <div><Messages /></div>;
      case 'ajouter-voiture':
        return <div><AddCar/></div>;
      case 'ajouter-temoignage':
        return <div>Ajouter un témoignage</div>;
      case 'modifier-voiture':
        return <div><CarTable /></div>;

      case 'valider-temoignage':
        return <div>Validation des témoignages</div>;
      case 'modifier-services':
        return <div><ServiceEditor /></div>;
      case 'definir-horaires':
        return <div><ScheduleEditor /></div>;
      default:
        return <div>Sélectionnez une option du menu</div>;
    }
  };

  return (
    <div className="w-3/4 h-screen p-4">
      {renderContent()}
    </div>
  );
};

export default Content;
