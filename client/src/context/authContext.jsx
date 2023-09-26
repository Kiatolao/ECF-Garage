import { createContext, useEffect, useState  } from "react"
import axios from 'axios'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //on vient chercher l'utilisateur dans le local storage, si aucun - null
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
        )

    const login = async (inputs) => {
       const res = await axios.post("http://localhost:8000/api/auth/login", inputs)
        setCurrentUser(res.data)
    } 
    
    const lougout = async (inputs) => {
        await axios.post("http://localhost:8000/api/auth/logout", inputs)
        setCurrentUser(null)
    }  
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, lougout}}>
      {children}
    </AuthContext.Provider>
  )
}
