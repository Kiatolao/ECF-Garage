import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  // mise en place du state input
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  })
  // mise en place du state error
  const [err, setError] = useState(null)

  const [success, setSuccess] = useState('')

  // Ici on recupère la valeur courante du state pour la mettre a jour
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  // Ici on envoie les données du state au serveur
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs)
      //reset les values si tout est ok et on affiche un message de succes
      setInputs({
        username: '',
        email: '',
        password: ''
      })
      setSuccess('Inscription réussie !');
      setError(null)
    } catch (err) {
      // Si il y a une erreur on la stock dans le state error
      setError(err.response.data)
    }
  }

  return (
  <>
  <h1>Enregister un nouvel utilisateur</h1>
  <form >
    <input type="text" placeholder='Utilisateur' name='username' onChange={handleChange} />
    <input type="text" placeholder='Email' name='email' onChange={handleChange}  />
    <input type="text" placeholder='Mot de passe' name='password' onChange={handleChange}  />
    <button onClick={handleSubmit}>Enregister</button>
    {/* Message d'erreur si il y en a une */}
    {err && <p className='text-red-500'>{err}</p>}  
    {success && <p className='text-green-500'>{success}</p>}
  </form>
  </>
  )
}

