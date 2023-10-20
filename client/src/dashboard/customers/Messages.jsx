import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Messages= () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/messages', {
          withCredentials: true,
        });

        const sortedMessages = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      }
    };

    fetchMessages();
  }, []); 

  //conveti iso en date au format français
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return date.toLocaleDateString(undefined, options); 
  };
  
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Liste des Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="mb-4 p-4 border rounded shadow w-full">
            <div>{message.firstName} - {message.lastName}</div>
            <div>{message.email}</div>
            <div className="font-semibold text-lg">{message.object}</div>
            <div className="text-gray-600">{message.message}</div>
            <div className="text-gray-400 mt-2">{formatDate(message.date)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};


