import { db } from "../db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => { 
    // Vérification des utilisateurs
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            return res.json(err); 
        }
        if (data.length > 0) {
            // 409 = données déja existantes (conflit)
            return res.status(409).json("L'email ou le nom d'utilisateur existe déjà"); 
        }
        //hashage du mot de passe et creation de l'utilisateur
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q, values, (err, data) => {
            if (err) {
                return res.json(err); 
            }
            return res.status(200).json("L'utilisateur a bien été créé"); 
        });
    });
};



export const login = async (req, res) => { 
//Si l'utilisateur existe
    const q = "SELECT * FROM users WHERE email = ?";
    
    db.query(q, [req, body, email], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(401).json("L'utilisateur n'existe pas");
    });

//Si le mot de passe est correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, data);
};

export const logout = async (req, res) => { 

};
