import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Message= () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les messages depuis la base de données
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/messages', {
          withCredentials: true, // Ajoutez cette option pour inclure les cookies
        });
        // Triez les messages par date du plus récent au plus ancien
        const sortedMessages = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      }
    };

    // Appelez la fonction pour récupérer les messages
    fetchMessages();
  }, []); // Le tableau vide indique que useEffect s'exécute une seule fois lors du montage

  //conveti iso en date au format français
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return date.toLocaleDateString(undefined, options); 
  };
  
  return (
    <div className="max-w-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Liste des Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="mb-4 p-4 border rounded shadow">
            <div className="font-semibold text-lg">{message.object}</div>
            <div className="text-gray-600">{message.message}</div>
            <div className="text-gray-400 mt-2">{formatDate(message.date)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};


