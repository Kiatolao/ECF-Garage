import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiChevronsRight } from 'react-icons/bi';


export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // récupération des services 
        async function fetchServices() {
            try {
                const response = await axios.get('http://localhost:8000/api/services');
                setServices(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des services :', error);
            }
        }

        fetchServices();
    }, []);

    return (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {services.map((service) => (
            <div key={service.id} className="flex items-center text-lg text-white">
            <BiChevronsRight size={25} className="" />
            <span>{service.service}</span>
            </div>
        ))}
        </div>
    );
};

