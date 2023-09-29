import React, { useState } from 'react';

const CreateCar = ({ onCarCreated }) => {
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

  const handleAddCar = async () => {
    // Envoyer les données du formulaire pour ajouter une nouvelle voiture (à implémenter)
    // Une fois la voiture ajoutée, vous pouvez appeler onCarCreated pour mettre à jour la liste
    onCarCreated();
  };

  return (
    <div>
      <h1>Ajouter une Voiture</h1>
      {/* Formulaire de création */}
    </div>
  );
};

export default CreateCar;
