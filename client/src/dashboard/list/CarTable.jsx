import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

Modal.setAppElement('#root');

export const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
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

  const handleEditCar = (car) => {
    // Afficher la modal avec les détails de la voiture
    setSelectedCar(car);
    setIsModalOpen(true); 
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cars/${carId}`, {
        withCredentials: true,
      });
      // mise à jour la liste des voitures après suppression
      const updatedCars = cars.filter((car) => car.id !== carId);
      setCars(updatedCars);
    } catch (error) {
      console.error('Erreur lors de la suppression de la voiture :', error);
    }
  };

  return (
    <>
 <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Titre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Année
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Prix
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            KM
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {cars.map((car) => (
            <tr key={car.id}>
            <td className="px-6 py-4 whitespace-nowrap">{car.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{car.km}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                className="text-blue-600 hover:text-blue-900 mr-2"
                onClick={() => handleEditCar(car)}
                >
                <AiOutlineEdit />
                </button>
                <button
                className="text-red-600 hover:text-red-900"
                onClick={() => handleDeleteCar(car.id)}
                >
                <AiOutlineDelete />
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    contentLabel="Détails de la voiture"
    >
        <div>
            <button onClick={() => setIsModalOpen(false)}>Fermer</button>
            <h2> Détails de la voiture</h2>
            {selectedCar && (
            <div>
                <p>ID: {selectedCar.id}</p>
                <p>Titre: {selectedCar.title}</p>
                {/* Ajoutez d'autres détails de la voiture ici */}
            </div>
            )}
        </div>
    </Modal>
    </>
  );
};
