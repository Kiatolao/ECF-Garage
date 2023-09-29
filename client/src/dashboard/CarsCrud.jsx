import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCar from './crudComponents/Createcar';
import DeleteCar from './crudComponents/DeleteCar';
import UpdateCar from './crudComponents/UpdateCar';


export  const CarsCrud= () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    // Charger la liste des voitures depuis l'API au chargement du composant
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }   
    fetchCars();
  }, []);

  const handleCarCreated = () => {
    // Mettre à jour la liste des voitures après la création
    // Cette fonction sera passée au composant CreateCar
  };

  const handleCarDeleted = async () => {
    try {
      // Vous pouvez ajouter ici une logique supplémentaire si nécessaire

      const response = await axios.get('http://localhost:8000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la liste des voitures après la suppression :', error);
    }
  };
  

  const handleCarUpdated = () => {
    // Mettre à jour la liste des voitures après la mise à jour
    // Cette fonction sera passée au composant UpdateCar
  };

  return (
    <div>
      <h1>Gestion des Voitures</h1>
      <CreateCar onCarCreated={handleCarCreated} />
      {/* Liste des voitures existantes avec options de modification/suppression */}
      {cars.map((car) => (
        <div key={car.id}>
          <p>{car.title}</p>
          <UpdateCar carId={car.id} onUpdateCar={handleCarUpdated} />
          <DeleteCar carId={car.id} onDeleteCar={handleCarDeleted} />
        </div>
      ))}
    </div>
  );
};

