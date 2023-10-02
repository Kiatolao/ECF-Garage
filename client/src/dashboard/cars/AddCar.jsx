import React, { useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import '../../App.css'


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
<div className="max-w-md  ">
  <h1 className="font-bold text-l mb-4">Créer une Nouvelle Voiture</h1>
  <form onSubmit={handleClick} className="">
    <div>
      <label className="block mb-2">Image de la Voiture</label>
      <input
        type="file"
        id="file"
        name=""
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-400 w-full"
      />
    </div>
    <div>
      <label className="block mb-2">Modèle de la Voiture</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-gray-400 w-full"
      />
    </div>
    <div>
      <label className="block mb-2">Année</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="border border-gray-400 w-full"
      />
    </div>
    <div>
      <label className="block mb-2">Prix (en €)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border border-gray-400 w-full"
      />
    </div>
    <div>
      <label className="block mb-2">Kilomètres (en km)</label>
      <input
        type="number"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        required
        className="border border-gray-400 w-full"
      />
    </div>
    <div className="sm:col-span-2">
      <label className="block mb-2">Description</label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
        className="border border-gray-400 w-full"
      ></textarea>
    </div>
    <div>
      <label className="block mb-2">Type de Carburant</label>
      <select
        value={fuel}
        onChange={(e) => setFuel(e.target.value)}
        required
        className="border border-gray-400 w-full"
      >
        <option value="">Sélectionnez un carburant</option>
        <option value="Essence">Essence</option>
        <option value="Diesel">Diesel</option>
      </select>
    </div>
    <div>
      <label className="block mb-2">Boîte de Vitesses</label>
      <select
        type="text"
        value={gearbox}
        onChange={(e) => setGearbox(e.target.value)}
        required
        className="border border-gray-400 w-full"
      >
        <option value="">Sélectionnez une transmission</option>
        <option value="Manuelle">Manuelle</option>
        <option value="Auto">Automatique</option>
      </select>
    </div>
    <div>
      <label className="block mb-2">Garantie (en mois)</label>
      <input
        type="number"
        value={warrant}
        onChange={(e) => setWarrant(e.target.value)}
        required
        className="border border-gray-400 w-full"
      />
    </div>
    <div className="sm:col-span-2">
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 mt-5 px-4 rounded hover:bg-blue-600 w-full"
      >
        Créer la Voiture
      </button>
    </div>
  </form>
</div>

  );
};


