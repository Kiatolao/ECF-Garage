import React, { useState } from 'react';

const UpdateCar = ({ carId, onUpdateCar }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    price: '',
    km: '',
    gearbox: '',
    fuel: '',
    desc: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateCar = async () => {
    // Envoyer les données du formulaire pour mettre à jour la voiture existante (à implémenter)
    // Une fois la voiture mise à jour, vous pouvez appeler onUpdateCar pour mettre à jour la liste
    onUpdateCar();
  };

  return (
    <div>
      <h1>Modifier la Voiture</h1>
      {/* Formulaire de mise à jour */}
    </div>
  );
};

export default UpdateCar;
