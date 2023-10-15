import React from 'react'
import { Schedules } from './Schedules';
import { Link } from 'react-router-dom';
import { MdOutlineSchedule } from 'react-icons/md';
import { MdOutlineContactPhone } from 'react-icons/md';
import { BiDirections } from 'react-icons/bi';

export const Infos = () => {
  return (
    <>
    <section className="text-dark p-4 mt-10 ">

    <div className="relative flex py-3 items-center mb-5">
      <div className="flex-grow border-t border-red-600"></div>
      <Link to="/contact" className="flex-shrink mx-4 text-gray-400 bg-red-600 text-white py-2 px-4 inline-block rounded-md">
          Contactez-nous
      </Link>
      <div className="flex-grow border-t border-red-600"></div>
    </div>

    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-15 ">

        <div className="md:col-span-1 mx-auto">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-600 font-semibold">
                    <MdOutlineSchedule className="mr-2" />Horaires
                </div>
            </h3>
          <Schedules />
        </div>

        <div className="md:col-span-1 mx-auto">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-600 font-semibold">
                    <MdOutlineContactPhone className="mr-2" />Contact
                </div>
            </h3>
          <address>
            123 Rue de l'Exemple<br />
            12345 Ville Exemple<br />
          </address><br />
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Email : contact@example.com</p>
        </div>
        <div className="md:col-span-1 mx-auto">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-600 font-semibold">
                    <BiDirections className="mr-2" />Accès rapide
                </div>
            </h3>
            <ul className="">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/cars">Occasions</Link>
              </li>
              <li>
                <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/plan-du-site">Plan du site</Link>
              </li>
            </ul>
        </div>
      </div>
    </section>

  </>
  )
}
