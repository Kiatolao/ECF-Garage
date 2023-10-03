import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ScheduleEditor = () => {
  const [schedules, setSchedules] = useState([]);
  const [editSchedule, setEditSchedule] = useState(null);
  const cancelEdit = () => {
    setEditSchedule(null);
  };

  // Charger les horaires depuis l'API
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

  // Mettre à jour un horaire dans la base de données
  const updateSchedule = async (editedSchedule) => {
    if (!editedSchedule) return;

    try {
      await axios.put(`http://localhost:8000/api/schedules/${editedSchedule.id}`, editedSchedule, { withCredentials: true}
    );
      // Mettre à jour l'horaire dans le state
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === editedSchedule.id ? editedSchedule : schedule
        )
      );

      setEditSchedule(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'horaire :', error);
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Editeur d'Horaires</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Ouverture Matin</th>
            <th>Fermeture Matin</th>
            <th>Ouverture Après-midi</th>
            <th>Fermeture Après-midi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.day}</td>
              <td>
                {editSchedule === schedule ? (
                  <input
                    type="text"
                    value={editSchedule.openingM}
                    onChange={(e) =>
                      setEditSchedule({
                        ...editSchedule,
                        openingM: e.target.value,
                      })
                    }
                    className="w-24 px-2 py-1 border rounded"
                  />
                ) : (
                  schedule.openingM
                )}
              </td>
              <td>
                {editSchedule === schedule ? (
                  <input
                    type="text"
                    value={editSchedule.closingM}
                    onChange={(e) =>
                      setEditSchedule({
                        ...editSchedule,
                        closingM: e.target.value,
                      })
                    }
                    className="w-24 px-2 py-1 border rounded"
                  />
                ) : (
                  schedule.closingM
                )}
              </td>
              <td>
                {editSchedule === schedule ? (
                  <input
                    type="text"
                    value={editSchedule.openingA}
                    onChange={(e) =>
                      setEditSchedule({
                        ...editSchedule,
                        openingA: e.target.value,
                      })
                    }
                    className="w-24 px-2 py-1 border rounded"
                  />
                ) : (
                  schedule.openingA
                )}
              </td>
              <td>
                {editSchedule === schedule ? (
                  <input
                    type="text"
                    value={editSchedule.closingA}
                    onChange={(e) =>
                      setEditSchedule({
                        ...editSchedule,
                        closingA: e.target.value,
                      })
                    }
                    className="w-24 px-2 py-1 border rounded"
                  />
                ) : (
                  schedule.closingA
                )}
              </td>
              <td>
                {editSchedule === schedule ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateSchedule(editSchedule)}
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
                  <button
                    onClick={() => setEditSchedule(schedule)}
                    className="text-blue-500 hover:underline"
                  >
                    Modifier
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
