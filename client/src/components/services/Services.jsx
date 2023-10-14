import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
      // récuperation des services 
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
    <div className="p-5 md:w-1/2 lg:w-1/3 xl:w-1/4">
    <h2 className="text-xl font-bold mb-4">Nos services</h2>
    <ul className="list-disc pl-6">
      {services.map((service) => (
        <li key={service.id} className="mb-2">{service.service}</li>
      ))}
    </ul>
  </div>
  )
}

