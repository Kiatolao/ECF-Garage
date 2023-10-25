import React, { useState } from 'react';
import axios from 'axios';
import { ServiceDel } from './ServiceDel';
import DOMPurify from 'isomorphic-dompurify';

export const ServiceEditor = ({ onServiceAdded }) => {
  const [serviceData, setServiceData] = useState({
    service: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecf-garage-server.vercel.app/api/services', serviceData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setServiceData({
          service: DOMPurify.sanitize(''),
        });

        //  mise à jour de la liste des services 
        if (onServiceAdded) {
          onServiceAdded();
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service :', error);
    }
  };

  return (
<>
<ServiceDel />
<div>
      <h2 className="text-xl font-bold mb-4 pt-5">Ajouter un service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="service" className="block mb-2">Nom du service</label>
          <input
            type="text"
            id="service"
            name="service"
            value={serviceData.service}
            onChange={handleChange}

            className="border border-gray-400 w-full"/>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Ajouter le service
          </button>
        </div>
      </form>
    </div>

</>

  );
};

