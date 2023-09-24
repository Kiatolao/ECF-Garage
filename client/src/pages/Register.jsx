import React from 'react'
import { useState } from 'react';

export const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  })

  // Ici on recupère la valeur courante du state pour la mettre a jour
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  const handleSubmit = async e => {
    e.preventDefault()
  }

  return (
  <>
  <h1>Enregister un nouvel utilisateur</h1>
  <form >
    <input type="text" placeholder='Utilisateur' name='username' onChange={handleChange} />
    <input type="text" placeholder='Email' name='email' onChange={handleChange}  />
    <input type="text" placeholder='Mot de passe' name='password' onChange={handleChange}  />
    <button onClick={handleSubmit}>Enregister</button>
  </form>
  </>
  )
}

