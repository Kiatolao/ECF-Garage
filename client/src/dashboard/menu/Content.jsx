import React from 'react';
import {Register} from '../admin/Register';
import {AddCar} from '../cars/AddCar';
import {Messages} from '../customers/Messages';
import {ScheduleEditor} from '../admin/ScheduleEditor';
import {ServiceEditor} from '../admin/ServiceEditor';
import {TestimonialsValidation} from '../customers/testimonial/TestimonialsValidation';
import { TestimonialAdd } from '../customers/testimonial/TestimonialAdd';
import { UpdateCar } from '../cars/UpdateCar';


export const Content = ({ selectedMenuItem }) => {
  //espace réservé au contenu du dashboard
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'ajouter-employe':
        return <Register />;
      case 'voir-messages':
        return <div><Messages /></div>;
      case 'ajouter-voiture':
        return <div><AddCar/></div>;
      case 'ajouter-temoignage':
        return <div><TestimonialAdd /></div>;
      case 'modifier-voiture':
        return <div><UpdateCar /></div>;
      case 'valider-temoignage':
        return <div><TestimonialsValidation /></div>;
      case 'modifier-services':
        return <div><ServiceEditor /></div>;
      case 'definir-horaires':
        return <div><ScheduleEditor /></div>;
      default:
        return <div><Messages /></div>;
    }
  };

  return (
    <>
      {renderContent()}
      </>
  );
};


