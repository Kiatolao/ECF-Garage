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
          <div className="bg-white p-4 mb-4 border rounded shadow w-full">
            <div className="flex justify-between">
              <div>
                {message.firstName} {message.lastName}
              </div>
              <div className="text-gray-400">{formatDate(message.date)}</div>
            </div>
            <div className="mt-2 border-b border-gray-300"></div>
            <div className="flex justify-between mt-2">
              <div>
                {message.email} <br/> 
              </div>
              <div className="text-gray-600">{message.phone}</div>
            </div>
            <div className="mt-2 border-b border-gray-300"></div>
            <h2 className="mt-2 font-semibold">{message.object}</h2>
            <div className="text-gray-600 mt-2">{message.message}</div>
          </div>
        ))}
      </ul>

    </div>
  );
};


