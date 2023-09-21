import { db } from "../db.js";

export const register = async (req, res) => { 
    // Vérification des utilisateurs
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, result) => {
        if (err) {
            return res.json(err); 
        }
        if (data.length > 0) {
            // 409 = données déja existantes
            return res.status(409).json("Email or username already exists"); 
        }
        //hashage du mot de passe et creation de l'utilisateur
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    });
};



export const login = async (req, res) => { 

};

export const logout = async (req, res) => { 

};
