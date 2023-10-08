import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Schedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // fonction asynchrone pour récupérer les horaires
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/schedules');
        setSchedules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des horaires :', error);
      }
    };
  
    fetchSchedules();
  }, []);
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Horaires :</h2>
      <div className="grid grid-cols-2 items-center">
        {schedules.map((schedule) => (
          <div key={schedule.id}>
            <p className="font-semibold">{schedule.day} :</p>
            <p>{schedule.openingM.slice(0, 5)}  {schedule.closingM.slice(0, 5)}</p>
            <p>{schedule.openingA.slice(0, 5)}  {schedule.closingA.slice(0, 5)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
