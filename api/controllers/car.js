import {db} from '../db.js';
import jwt from 'jsonwebtoken';


  
export const getCars =  (req, res) => {
    const q = 'SELECT * FROM cars';
    db.query(q, (err, result) => {
        if (err) 
        return res.status(500).send(err);
        res.status(200).json(result);
    });
};

export const getCar =  (req, res) => {
    const q = 'SELECT * FROM cars WHERE id = ?';
    db.query (q, [req.params.id], (err, result) => {
        if (err) 
        return res.status(500).send(err);
        res.status(200).json(result);
    });
};

export const deleteCar = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Vous devez être connecté pour supprimer une voiture.");
  
    jwt.verify(token, "jwtkey", (err) => {
      if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer cette voiture.");
      
      const carId = req.params.id;
      const q = 'DELETE FROM cars WHERE `id` = ?';
  
      db.query(q, [carId], (err, data) => {
        if (err) {
          return res.status(500).json('Une erreur s\'est produite lors de la suppression de la voiture.');
        }
        return res.status(200).json('La voiture a été supprimée avec succès.');
      });
    });
  };
  
  export const addCar= (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Pas de token trouvé.");
  
    jwt.verify(token, "jwtkey", (err) => {
      if (err) return res.status(403).json("Le token n'est pas valide.");
  
      const q =
        "INSERT INTO cars (`title`, `desc`, `image`, `year`, `price`,`km`, `fuel`, `gearbox`, `warrant`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.image,
        req.body.year,
        req.body.price,
        req.body.km,
        req.body.fuel,
        req.body.gearbox,
        req.body.warrant,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("La voiture a été ajoutée avec succès.");
      });
    });
  };

export const updateCar =  (req, res) => {
       const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Pas de token trouvé.");
  
    jwt.verify(token, "jwtkey", (err) => {
      if (err) return res.status(403).json("Le token n'est pas valide.");
  
      const q = 
      "UPDATE cars SET `title`=?, `desc`=?, `image`=?, `year`=?, `price`=?, `km`=?, `fuel`=?, `gearbox`=?, `warrant`=? WHERE `id`=?";

  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.image,
        req.body.year,
        req.body.price,
        req.body.km,
        req.body.fuel,
        req.body.gearbox,
        req.body.warrant,
        req.params.id
      ];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("La voiture a été modifiée avec succès.");
      });
    });
}; 