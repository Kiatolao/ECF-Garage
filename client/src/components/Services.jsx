import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Services = () => {
  const [services, setServices] = useState([]);


  useEffect(() => {
    // fetch des services 
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
<div className="p-5">
  <h2 className="text-2xl font-bold mb-4">Le garage Parrot vous accompagne</h2>
  <p className="mb-4">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet incidunt facere excepturi natus fuga itaque saepe tempora facilis odio sit molestias nesciunt eaque magni, beatae error exercitationem blanditiis molestiae nostrum, maxime quis. Cumque voluptas fugit obcaecati vitae eligendi nostrum, fuga enim placeat necessitatibus praesentium ut architecto vero atque iure modi?
  </p>
  <h2 className="text-xl font-bold mb-4">Services proposés par le garage</h2>
  <ul className="list-disc pl-6">
    {services.map((service) => (
      <li key={service.id} className="mb-2">{service.service}</li>
    ))}
  </ul>
</div>

  );
};


