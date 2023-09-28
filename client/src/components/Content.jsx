import React from 'react';
import {Register} from '../DashboardFeatures/Register';

const Content = ({ selectedMenuItem }) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'ajouter-employe':
        return <Register/>;
      case 'ajouter-voiture':
        return <div>Ajouter une voiture</div>;
      case 'ajouter-temoignage':
        return <div>Ajouter un témoignage</div>;
      case 'modifier-services':
        return <div>Modifier les services</div>;
      case 'definir-horaires':
        return <div>Définir les horaires</div>;
      case 'messagerie':
        return <div>Messagerie</div>;
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
