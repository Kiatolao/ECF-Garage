import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateCar = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [km, setKm] = useState('');
  const [desc, setDesc] = useState('');
  const [fuel, setFuel] = useState(''); // Ajoutez ici une option pour choisir entre Manuelle ou Automatique
  const [gearbox, setGearbox] = useState('');
  const [warrant, setWarrant] = useState('');

  const handleFileChange = (e) => {
    // Gérez ici le changement de fichier (image)
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Envoyez les données du formulaire pour créer une nouvelle voiture (à implémenter)
      const response = await axios.post('http://localhost:8000/api/cars', {
        title,
        year,
        price,
        km,
        desc,
        fuel,
        gearbox,
        warrant,
        // Ajoutez d'autres données ici en fonction de vos besoins
      });

      // Redirigez l'utilisateur vers la page de détails de la voiture nouvellement créée
      navigate(`/car_detail/${response.data.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de la voiture :', error);
    }
  };

  return (
    <div>
      <h1>Créer une Nouvelle Voiture</h1>
      <form onSubmit={handleClick}>
        <div>
          <label>Image de la Voiture</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Modèle de la Voiture</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Année</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prix (en €)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kilomètres (en km)</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Type de Carburant</label>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            required
          >
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </select>
        </div>
        <div>
          <label>Boîte de Vitesses</label>
          <input
            type="text"
            value={gearbox}
            onChange={(e) => setGearbox(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Garantie (en mois)</label>
          <input
            type="number"
            value={warrant}
            onChange={(e) => setWarrant(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer la Voiture</button>
      </form>
    </div>
  );
};

export default CreateCar;
