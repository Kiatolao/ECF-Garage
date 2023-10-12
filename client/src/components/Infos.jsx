import React from 'react'
import { Schedules } from './Schedules';
import { Link } from 'react-router-dom';
import { MdOutlineSchedule } from 'react-icons/md';
import { MdOutlineContactPhone } from 'react-icons/md';

export const Infos = () => {
  return (
    <>
    <section className="text-dak p-4 mt-5">
    <div className="mb-2 mt-2 border-b border-gray-300"></div>  
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
        <div className="md:col-span-1">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42423.73197165776!2d-1.2365334806339996!3d48.35123714430663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48093778fd795953%3A0x6531938abaecd607!2s35133%20Foug%C3%A8res%2C%20France!5e0!3m2!1sfr!2sus!4v1697126506785!5m2!1sfr!2sus"
              width="auto"
              height="225"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center">
                    <MdOutlineSchedule className="mr-2" />Horaires
                </div>
            </h3>
          <Schedules />
        </div>
        <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center">
                    <MdOutlineContactPhone className="mr-2" />Contact
                </div>
            </h3>
          <address>
            123 Rue de l'Exemple<br />
            12345 Ville Exemple<br />
          </address><br />
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Email : contact@example.com</p>
          <Link to="/contact" className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block mt-4">
            Contactez-nous
          </Link>
        </div>
      </div>
    </section>

  </>
  )
}
