import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Schedules = () => {
  
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // fonction asynchrone pour récupérer les horaires
    const fetchSchedules = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/schedules`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des horaires :', error);
      }
    };
  
    fetchSchedules();
  }, []);



  return (
<div className="">
  <table >
    <thead></thead>
    <tbody>
      {/* utilisation de map() pour itérer le schema avec toues les horaires */}
      {schedules.map((schedule) => (
        <tr key={schedule.id}>
          <td className='pr-5'>{schedule.day}</td>
          <td>
            {schedule.openingM !== 'Fermé' && schedule.closingM !== 'Fermé' ? (
              <>
                {schedule.openingM.slice(0, 5)}-{schedule.closingM.slice(0, 5)}
              </>
            ) : (
              'Fermé'
            )}
            <span style={{ marginLeft: '20px' }}></span>
            {schedule.openingA !== 'Fermé' && schedule.closingA !== 'Fermé' ? (
              <>
               {schedule.openingA.slice(0, 5)}-{schedule.closingA.slice(0, 5)}
              </>
            ) : (
              ''
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );

};
