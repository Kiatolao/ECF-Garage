import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Services = () => {
  const [services, setServices] = useState([]);


  useEffect(() => {
    // Charger les services depuis l'API
    async function fetchServices() {
      try {
        const response = await axios.get('http://localhost:8000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des services :', error);
      }
    }

    fetchServices();
  }, []);

  return (
    <div>
      <h2>Services proposés par le garage</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.service}</li>
        ))}
      </ul>
      <h2>Expertises et certifications</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.expertise}</li>
        ))}
      </ul>
    </div>
  );
};


