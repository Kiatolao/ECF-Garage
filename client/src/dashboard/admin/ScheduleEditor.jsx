import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ScheduleEditor = () => {
  const [schedules, setSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState(null);

  useEffect(() => {
    // Récupérer les horaires depuis le serveur
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

  const handleEditClick = (schedule) => {
    // Ouvrir l'éditeur pour cet horaire
    setEditingSchedule(schedule);
    setEditedSchedule({ ...schedule });
  };

  const handleEditCancel = () => {
    // Annuler l'édition en cours
    setEditingSchedule(null);
    setEditedSchedule(null);
  };

  const handleEditSave = async () => {
    try {
      // Envoyer la mise à jour de l'horaire au serveur
      await axios.put(`http://localhost:8000/api/schedules/${editedSchedule.id}`, editedSchedule, {
        withCredentials: true,
      });

      // Mettre à jour l'état local des horaires
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === editedSchedule.id ? editedSchedule : schedule
      );
      setSchedules(updatedSchedules);

      // Fermer l'éditeur
      setEditingSchedule(null);
      setEditedSchedule(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'horaire :', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des horaires</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Jour</th>
            <th className="border border-gray-300 px-4 py-2">Ouverture Matin</th>
            <th className="border border-gray-300 px-4 py-2">Fermeture Matin</th>
            <th className="border border-gray-300 px-4 py-2">Ouverture Après-midi</th>
            <th className="border border-gray-300 px-4 py-2">Fermeture Après-midi</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{schedule.day}</td>
              {editingSchedule === schedule ? (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="openingM"
                      value={editedSchedule.openingM}
                      onChange={(e) =>
                        setEditedSchedule({ ...editedSchedule, openingM: e.target.value })
                      }
                      className="border border-gray-400 w-full px-4 py-2 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="closingM"
                      value={editedSchedule.closingM}
                      onChange={(e) =>
                        setEditedSchedule({ ...editedSchedule, closingM: e.target.value })
                      }
                      className="border border-gray-400 w-full px-4 py-2 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="openingA"
                      value={editedSchedule.openingA}
                      onChange={(e) =>
                        setEditedSchedule({ ...editedSchedule, openingA: e.target.value })
                      }
                      className="border border-gray-400 w-full px-4 py-2 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="closingA"
                      value={editedSchedule.closingA}
                      onChange={(e) =>
                        setEditedSchedule({ ...editedSchedule, closingA: e.target.value })
                      }
                      className="border border-gray-400 w-full px-4 py-2 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={handleEditSave}
                    >
                      Valider
                    </button>
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                      onClick={handleEditCancel}
                    >
                      Annuler
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 px-4 py-2">{schedule.openingM}</td>
                  <td className="border border-gray-300 px-4 py-2">{schedule.closingM}</td>
                  <td className="border border-gray-300 px-4 py-2">{schedule.openingA}</td>
                  <td className="border border-gray-300 px-4 py-2">{schedule.closingA}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleEditClick(schedule)}
                    >
                      Modifier
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


