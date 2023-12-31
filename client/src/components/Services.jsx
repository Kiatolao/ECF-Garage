import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiChevronsRight } from 'react-icons/bi';
import { BeatLoader} from 'react-spinners'; 


export const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // récupération des services 
        async function fetchServices() {
            try {
                setLoading(true);
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/api/services`);
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des services :', error);
            }
        }

        fetchServices();
    }, []);

    return (
        <>
        <div className="flex items-center justify-center pt-10 ">
          {loading && <BeatLoader color="rgba(214, 54, 54, 1)" className='ml-[100px]'/>}
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {services.map((service) => (
            <div key={service.id} className="flex items-center text-lg text-white">
            <BiChevronsRight size={25} className="text-red-700" />
            <span>{service.service}</span>
            </div>
        ))}
        </div>
        </>
    );
};

