import React from 'react'

export const Register = () => {
  return (
  <>
  <h1>Enregister un nouvel utilisateur</h1>
  <form >
    <input type="text" placeholder='Utilisateur' />
    <input type="text" placeholder='Mot de passe' />
    <button>Enregister</button>
  </form>
  </>
  )
}
