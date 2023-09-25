import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      await axios.post("http://localhost:8000/api/auth/login", inputs)
      //reset les values si tout est ok et on affiche un message de succes
      navigate('/dashboard')
    } catch (err) {
      // Si il y a une erreur on la stock dans le state error
      setError(err.response.data)
    }
  }

  return (
  <>
  <h1>Connexion au compte</h1>
  <form >
    <input type="text" placeholder='Email' name='email' onChange={handleChange}  />
    <input type="text" placeholder='Mot de passe' name='password' onChange={handleChange}  />
    <button onClick={handleSubmit}>Se connecter</button>
    {/* Message d'erreur si il y en a une */}
    {err && <p className='text-red-500'>{err}</p>}  
  </form>
  </>
  )
}