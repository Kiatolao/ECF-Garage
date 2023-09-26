import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import garageLogo from '../assets/parrot-logo.png';

export const Login = () => {
  
  // mise en place du state input
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  // mise en place du state error
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  // Ici on recupère la valeur courante du state pour la mettre a jour
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  // Ici on envoie les données du state au serveur
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/auth/login", inputs, {withCredentials: true})
      //reset les values si tout est ok et on affiche un message de succes
      navigate('/dashboard')
    } catch (err) {
      // Si il y a une erreur on la stock dans le state error
      setError(err.response.data)
    }
  }

  return (
  <>
<div class="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src={garageLogo} alt="Your Company"/>
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion au compte</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div class="mt-2">
          <input onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
        </div>
        <div class="mt-2">
          <input onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button onClick={handleSubmit} type="submit" class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Se connecter</button>
         {/* Message d'erreur si il y en a une */}
          {err && <p className='text-red-500'>{err}</p>}  
      </div>
    </form>

  </div>
</div>

  </>
  )
}