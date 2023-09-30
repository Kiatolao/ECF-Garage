import React, { useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';


export const AddCar = () => {

  const state = useLocation().state;
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [km, setKm] = useState("");
  const [desc, setDesc] = useState("");
  const [fuel, setFuel] = useState(""); 
  const [gearbox, setGearbox] = useState("");
  const [warrant, setWarrant] = useState("");
  const [file, setFile] = useState(null);


  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8000/api/upload", formData, {
  withCredentials: true
});
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http://localhost:8000/api/cars/${state.id}`, {
            title,
            year,
            price,
            km,
            desc,
            fuel,
            gearbox,
            warrant,
            image: file ? imgUrl : "",
          })
        : await axios.post(`http://localhost:8000/api/cars/`, {
            title,
            year,
            price,
            km,
            desc,
            fuel,
            gearbox,
            warrant,
            image: file ? imgUrl : "",
            }, {
            withCredentials: true
          });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la voiture :', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1>Créer une Nouvelle Voiture</h1>
      <form onSubmit={handleClick}>
        <div>
          <label>Image de la Voiture</label>
          <input
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />

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
             <option value="">Sélectionnez un carburant</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
        <div>
          <label>Boîte de Vitesses</label>
          <select
            type="text"
            value={gearbox}
            onChange={(e) => setGearbox(e.target.value)}
            required
          >
             <option value="">Sélectionnez une transmission</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Auto">Automatique</option>
            </select>
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


