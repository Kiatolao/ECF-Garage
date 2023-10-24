import React from 'react';
import axios from 'axios';


const DeleteCar = ({ carId, onDeleteCar }) => {

  const handleDeleteCar = async () => {
    try {

        await axios.delete(`http://localhost:8000/api/cars/${carId}`, {
          withCredentials: true,
        });
        
        onDeleteCar();
      } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
      }
    };

  return (
    <div>
      <button onClick={handleDeleteCar}>Supprimer une voiture</button>

    </div>
  );
};

export default DeleteCar;
