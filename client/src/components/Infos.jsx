import React from 'react'
import { Schedules } from './Schedules';
import { Link } from 'react-router-dom';
import { MdOutlineSchedule } from 'react-icons/md';
import { MdOutlineContactPhone } from 'react-icons/md';
import { BiDirections } from 'react-icons/bi';
import {Footer} from './Footer'


export const Infos = () => {
  return (
    <>
    <section className="text-dark p-4 mt-10 z-10">

    <div className=" flex py-3 items-center mb-5">
      <div className="flex-grow border-t border-red-700"></div>
      <Link to="/contact" className="flex-shrink mx-4 bg-red-700 text-white py-2 px-4 inline-block rounded-md">
          Contactez-nous
      </Link>
      <div className="flex-grow border-t border-red-700"></div>
    </div>

    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-15 ">

        <div className="md:col-span-1 md:mx-auto ">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-700 font-semibold">
                    <MdOutlineSchedule className="mr-2" />Horaires
                </div>
            </h3>
          <Schedules />
        </div>

        <div className="md:col-span-1 md:mx-auto">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-700 font-semibold">
                    <MdOutlineContactPhone className="mr-2" />Contact
                </div>
            </h3>
          
            17 Rue Nowhere<br />
            35300 Fougères<br />
          <p>Téléphone : 01 02 03 04 05</p>
          <p>Email : vincent@parrot.fr</p>
        </div>
        <div className="md:col-span-1 md:mx-auto">
            <h3 className="text-xl font-semibold mb-2">
                <div className="flex items-center text-red-700 font-semibold">
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
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/Privacy">Politique de confidentialité</Link>
              </li>
            </ul>
        </div>
      </div>
    </section>
    <Footer />
  </>
  )
}
