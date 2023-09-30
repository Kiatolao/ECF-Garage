import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (inputs) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/auth/login", inputs, {
                withCredentials: true,
            });
            setCurrentUser(res.data);
            // stocker le token dans un cookie
            Cookies.set("access_token", res.data.token, { 
                sameSites: "none",
                secure: true,
                httpsOnly: true
            });

        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout");
            // effacer le cookie utilisateur
            Cookies.remove("access_token");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
