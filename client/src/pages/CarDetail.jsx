import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchCarDetails();
  }, [id]);

  return (
    <div>

      <h1>{car.title}</h1>

    </div>
  );
};
