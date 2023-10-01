import React from 'react';
import axios from 'axios';


const DeleteCar = ({ carId, onDeleteCar }) => {
  
  const handleDeleteCar = async () => {
    try {
        await axios.delete(`http://localhost:8000/api/cars/${carId}`, {
          withCredentials: true,
        });
        // met a jour la liste des voitures après la suppression	
        onDeleteCar();
      } catch (error) {
        console.error('Erreur lors de la suppression de la voiture :', error);
      }
    };

  return (
    <div>
      <button onClick={handleDeleteCar}>Supprimer une voiture</button>

    </div>
  );
};

export default DeleteCar;
