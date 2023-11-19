import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AiOutlineDelete} from 'react-icons/ai';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  //récupération des utilisateurs, le get est configuré pour ne récupérer que les données affichées: utilisteur/email
  const fetchUsers = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/auth`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés');
    }
  };

  //effacer un utilisateur
  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (shouldDelete) {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/api/auth/${userId}`, {
        withCredentials: true,
      });
      // mettre à jour la liste des employés après la suppression
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé');
    }
  }
  };

  //rafraichi la liste des utilisateurs
  const handleRefresh = () => {
    fetchUsers();
  };

  return (

    <div className="w-full mt-5">
      <h2 className="text-xl font-bold mb-4">Liste des employés</h2>
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mb-4"
        onClick={handleRefresh}
      >
        Rafraîchir
      </button>
      {users.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-200" key='info'> 
              <th className="px-4 py-2">Nom d'utilisateur</th>
              <th className="px-4 py-2">Adresse e-mail</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
              <tr >
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-800 flex items-center">
                  <AiOutlineDelete className="mr-1" />
                  Supprimer
              </button>
                </td>
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun employé trouvé.</p>
      )}
    </div>
  );
};