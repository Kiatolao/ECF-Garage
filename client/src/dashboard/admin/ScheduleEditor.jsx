import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ScheduleEditor = () => {
  const [schedules, setSchedules] = useState([]);
  const [editSchedule, setEditSchedule] = useState(null);

  // charger les horaires 
  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await axios.get('http://localhost:8000/api/schedules');
        setSchedules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des horaires :', error);
      }
    }
    fetchSchedules();
  }, []);

  //  mettre à jour un horaire dans la base de données
  const updateSchedule = async () => {
    if (!editSchedule) return;

    try {
      await axios.put(`/api/horaires/${editSchedule.id}`, editSchedule);
      // mise a jour de l'horaire dans le state
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === editSchedule.id ? editSchedule : schedule
        )
      );

      setEditSchedule(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'horaire :', error);
    }
  };

  // Fonction pour annuler la modification de l'horaires
  const cancelEdit = () => {
    setEditSchedule(null);
  };

  return (
    <div className="max-w-lg ">
      <h2 className="text-2xl font-semibold mb-4">Horaires</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id} className="mb-4">
            {editSchedule === schedule ? (
              <div className="flex items-center space-x-2">
                <div>{schedule.day}</div>
                <input
                  type="text"
                  value={editSchedule.openingM}
                  onChange={(e) =>
                    setEditSchedule({...editSchedule, openingM: e.target.value,
                    })
                  }
                  className="w-24 px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editSchedule.closingM}
                  onChange={(e) =>
                    setEditSchedule({...editSchedule, closingM: e.target.value,
                    })
                  }
                  className="w-24 px-2 py-1 border rounded"
                />
                <button
                  onClick={updateSchedule}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                >
                  Enregistrer
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-red-500 hover:underline"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div>{schedule.day}</div>
                <div>{schedule.openingM}</div>
                <div>{schedule.closingM}</div>
                <p>/</p>
                <div>{schedule.openingA}</div>
                <div>{schedule.closingA}</div>
                <button
                  onClick={() => setEditSchedule(schedule)}
                  className="text-blue-500 hover:underline"
                >
                  Modifier
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


