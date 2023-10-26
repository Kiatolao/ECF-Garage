import { db } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import DOMPurify from "isomorphic-dompurify";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => { 

    // création utilisateurs
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [DOMPurify.sanitize(req.body.email), DOMPurify.sanitize(req.body.username)], (err, data) => {
        if (err) {
            return res.status(500).json(err); 
        }
        if (data.length > 0) {
            // 409 = données déja existantes (conflit)
            return res.status(409).json("L'email ou le nom d'utilisateur existe déjà"); 
        }
        //hashage du mot de passe et creation de l'utilisateur
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [
            DOMPurify.sanitize(req.body.username),
            DOMPurify.sanitize(req.body.email),
            DOMPurify.sanitize(hash)
        ]

        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).json(err); 
            }
            return res.status(200).json("L'utilisateur a bien été créé"); 
        });
    });
};


export const login = async (req, res) => { 

    // Si l'utilisateur existe
    const q = "SELECT * FROM users WHERE email = ?";
    
    db.query(q, [DOMPurify.sanitize(req.body.email)], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(401).json("Donnée incorrecte!");
        }

        // Si le mot de passe est correct
        const isPasswordValid = bcryptjs.compareSync(
            DOMPurify.sanitize(req.body.password), 
            data[0].password
        );
        
        if (!isPasswordValid)
        return res.status(400).json("Email ou mot de passe incorrect");

        // Création du token    
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
        //separer le mot de passe de data
        const { password, ...other } = data[0];
  
        res.cookie("access_token", token, {
            httpsOnly: true,
            secure: true
            }).status(200).json(other);
    });
  };

export const logout = async (req, res) => { 
    //on efface le cookie pour se déconnecter
    res.clearCookie("access_token", {
        sameSites: "none",
        secure: true,
    }).status(200).json("Vous êtes déconnecté");
};   

