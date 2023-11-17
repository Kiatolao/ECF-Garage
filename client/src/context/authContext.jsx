import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //envoie des données au controller auth.js
    const login = async (inputs) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(
                `${apiUrl}/api/auth/login`, inputs, {
                withCredentials: true,
            });
            setCurrentUser(res.data);
            // stocker le token dans un cookie
            Cookies.set("access_token", res.data.token, { 
                sameSites: "none",
                secure: true,
                httpOnly: true
            });

        } catch (err) {
            console.log(err);
        }
    };

    //déconnexion
    const logout = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.post(`${apiUrl}/api/auth/logout`);
            // effacer le cookie utilisateur
            Cookies.remove("access_token");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        // fourni les valeurs du composant enfant
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
