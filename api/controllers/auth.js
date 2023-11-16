import { db } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import DOMPurify from "isomorphic-dompurify";
import dotenv from "dotenv";

dotenv.config();

//enregister un nouvelle employé
export const register = async (req, res) => { 
    // validation du password, 8 caractères et un chiffre au minimum
    const password = DOMPurify.sanitize(req.body.password); 

    if (!password || password.length < 8) {
        return res.status(400).json({
          error: 'Le mot de passe doit contenir au moins 8 caractères.',
        });
    }
    if (!/\d/.test(password)) {
        return res.status(400).json({
          error: 'Le mot de passe doit contenir au moins un chiffre.',
        });
    }

    // création utilisateurs
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [DOMPurify.sanitize(req.body.email), DOMPurify.sanitize(req.body.username)], (err, data) => {
        if (err) {
            return res.status(500).json(err); 
        }
        if (data.length > 0) {
            // 409 = données déja existantes (conflit)
            return res.status(409).json("Données incorrectes"); 
        }
        //hashage du mot de passe et creation de l'utilisateur
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt);

        //envoi des données dans la base de données
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

//formulaire de connexion
export const login = async (req, res) => { 
    // si l'utilisateur existe
    const q = "SELECT * FROM users WHERE email = ?";
    
    db.query(q, [DOMPurify.sanitize(req.body.email)], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(401).json("Donnée incorrecte!");
        }

        // si le mot de passe est correct
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
            httpOnly: true,
            secure: true,
            sameSite: "none"
            }).status(200).json(other);
    });
  };

//déconnexion
export const logout = async (req, res) => { 
    //on efface le cookie pour se déconnecter
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    }).status(200).json("Vous êtes déconnecté");
};

//récupération des utilisateurs
export const getUsers =  (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un utilisteur.");
  
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer cet utilisteur.");
    const q = 'SELECT username, email FROM users';
    db.query(q, (err, result) => {
        if (err) 
        return res.status(500).send(err);
        res.status(200).json(result);
    });
    });
};

//effacer un utilisateur
export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un utilisteur.");
  
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer cet utilisteur.");
      
      const userId = req.params.id;
      const q = 'DELETE FROM users WHERE `id` = ?';
  
      db.query(q, [userId], (err, data) => {
        if (err) {
          return res.status(500).json('Une erreur s\'est produite lors de la suppression de l\'utilisateur.');
        }
        return res.status(200).json('L\'utilisateur a été supprimé avec succès.');
      });
    });
  };

