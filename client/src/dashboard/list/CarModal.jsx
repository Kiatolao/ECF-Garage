import React from 'react';

const CarModal = ({ car, onClose }) => {
  return (
<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="modal">
    <div className="modal-content bg-white shadow-md rounded-lg p-8">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4">Détails de la voiture</h2>
      <p className="mb-2">ID: {car.id}</p>
      <p className="mb-2">Titre: {car.title}</p>
      {/* Ajoutez d'autres détails de la voiture ici */}
    </div>
  </div>
</div>

  );
};

export default CarModal;
