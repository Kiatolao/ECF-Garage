import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import garageLogo from '../assets/parrot-logo.png';
import { AuthContext } from '../context/authContext';
import layer from '../assets/layer.jpg';

export const Login = () => {
  
  // mise en place du state input
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  // mise en place du state error
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext)

  // Ici on recupère la valeur courante du state pour la mettre a jour
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  // Ici on envoie les données du state au serveur
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/dashboard')
    } catch (err) {
      // Si il y a une erreur on la stock dans le state error
      setError(err.response.data)
    }
  }

  return (
  <>  
    <div>
      <img src={layer} alt="Moteur" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80"/>
      <div className="border-t border-black"></div>
    </div>

    <div className="flex  flex-col justify-center px-6 py-6 lg:px-8 mt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={garageLogo} alt="Your Company"/>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion au compte</h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input onChange={handleChange} id="email"
                name="email"
                type="email"
                autoComplete="email"
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password"
               className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            </div>
            <div className="mt-2">
              <input onChange={handleChange} 
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button onClick={handleSubmit} type="submit"
             className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">Se connecter</button>
              {err && <p className='text-red-700'>{err}</p>}  
          </div>
        </form>

      </div>
    </div>

  </>
  )
}