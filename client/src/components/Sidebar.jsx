import React from 'react';

const Sidebar = ({ onSelectMenuItem }) => {
  return (
    <div className="w-1/4 h-screen bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Username de l'utilisateur</h2>
      <div className="mb-4 border-b border-gray-400"></div>
      <ul>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-employe')}>Ajouter un employé</li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-voiture')}>Ajouter une voiture</li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-temoignage')}>Ajouter un témoignage</li>
        <div className="mb-4 border-b border-gray-400"></div>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('modifier-services')}>Modifier les services</li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('definir-horaires')}>Définir les horaires</li>
        <div className="mb-4 border-b border-gray-400"></div>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('messagerie')}>Messagerie</li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('se-deconnecter')}>Se déconnecter</li>
      </ul>
    </div>
  );
};

export default Sidebar;
