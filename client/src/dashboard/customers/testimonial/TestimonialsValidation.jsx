import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Archived } from './Archived';
import { Pending } from './Pending';

export const TestimonialsValidation = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [archivedTestimonials, setArchivedTestimonials] = useState([]);


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://ecf-garage-server.vercel.app/api/testimonials', {
          headers: {
            Authorization: `Bearer ${token}`  
          },
          withCredentials: true,
        });
        const allTestimonials = response.data;
        const pendingTestimonials = allTestimonials.filter((testimonial) => testimonial.validated === 0);
        const archivedTestimonials = allTestimonials.filter((testimonial) => testimonial.validated === 1);
        setTestimonials(pendingTestimonials);
        setArchivedTestimonials(archivedTestimonials);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages :', error);
      }
    };

    fetchTestimonials();
  }, []);

  const validateTestimonial = async (testimonialId) => {
    try {
      await axios.put(`https://ecf-garage-server.vercel.app/api/testimonials/${testimonialId}`, {
        validated: 1,
      }, {
        withCredentials: true,
      });

      // transfert du témoignage dans la liste des témoignages archivés
      const updatedTestimonials = testimonials.filter(
        (testimonial) => testimonial.id !== testimonialId
      );
      const archivedTestimonial = testimonials.find(
        (testimonial) => testimonial.id === testimonialId
      );
      setTestimonials(updatedTestimonials);
      setArchivedTestimonials([...archivedTestimonials, archivedTestimonial]);
    } catch (error) {
      console.error('Erreur lors de la validation du témoignage :', error);
    }
  };

  const deleteTestimonial = async (testimonialId) => {
    try {
      await axios.delete(`https://ecf-garage-server.vercel.app/api/testimonials/${testimonialId}`, {
        withCredentials: true,
      });
  
      // supprime témoignage dans le tableau archivé
      const updatedArchivedTestimonials = archivedTestimonials.filter(
        (testimonial) => testimonial.id !== testimonialId
      );
      setArchivedTestimonials(updatedArchivedTestimonials);
  
      // supprimer temoignage de la liste des témoignages en attente
      const updatedTestimonials = testimonials.filter(
        (testimonial) => testimonial.id !== testimonialId
      );
      setTestimonials(updatedTestimonials);
    } catch (error) {
      console.error('Erreur lors de la suppression du témoignage :', error);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Témoignages en attente de validation</h2>
      <Pending
        testimonials={testimonials}
        validateTestimonial={validateTestimonial}
        deleteTestimonial={deleteTestimonial}
      />

      <h2 className="text-xl pt-5 font-bold my-4">Témoignages archivés</h2>
      <Archived
        archivedTestimonials={archivedTestimonials}
        deleteTestimonial={deleteTestimonial}
      />
    </div>
  );
};