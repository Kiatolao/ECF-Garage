import {db} from '../db.js';
import jwt from 'jsonwebtoken';
import DOMPurify from 'isomorphic-dompurify'
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary'

dotenv.config();
  
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
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET_KEY,
  secure : true
});
export const deleteCar = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour supprimer une voiture.");

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer cette voiture.");
    
    const carId = req.params.id;
    const q = 'SELECT image FROM cars WHERE id = ?';

    db.query(q, [carId], (err, data) => {
      if (err) {
        return res.status(500).json('Une erreur s\'est produite lors de la suppression de la voiture.');
      }

      const car = data[0];
      if (!car) {
        return res.status(404).json("La voiture n'a pas été trouvée.");
      }

      const imageURL = car.image;
      const imagePublicId = imageURL.split('/').pop().split('.')[0];

      // Delete the image from Cloudinary
      cloudinary.uploader.destroy(imagePublicId)
        .then(() => {
          const deleteQuery = 'DELETE FROM cars WHERE id = ?';
          db.query(deleteQuery, [carId], (err) => {
            if (err) {
              return res.status(500).json('Une erreur s\'est produite lors de la suppression de la voiture.');
            }
            return res.status(200).json('La voiture a été supprimée avec succès.');
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'image sur Cloudinary:', error);
          return res.status(500).json('Une erreur s\'est produite lors de la suppression de la voiture.');
        });
    });
  });
};
  
  export const addCar= (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Pas de token trouvé.");
  
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(403).json("Le token n'est pas valide.");
  
      const q =
        "INSERT INTO cars (`title`, `image`, `year`, `price`,`km`, `fuel`, `gearbox`, `warrant`) VALUES (?)";
  
      const values = [
        DOMPurify.sanitize(req.body.title),
        DOMPurify.sanitize(req.body.image),
        DOMPurify.sanitize(req.body.year),
        DOMPurify.sanitize(req.body.price),
        DOMPurify.sanitize(req.body.km),
        DOMPurify.sanitize(req.body.fuel),
        DOMPurify.sanitize(req.body.gearbox),
        DOMPurify.sanitize(req.body.warrant)
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
  
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(403).json("Le token n'est pas valide.");
  
      const q = 
      "UPDATE cars SET `title`=?, `image`=?, `year`=?, `price`=?, `km`=?, `fuel`=?, `gearbox`=?, `warrant`=? WHERE `id`=?";

      const values = [
        DOMPurify.sanitize(req.body.title),
        DOMPurify.sanitize(req.body.image),
        DOMPurify.sanitize(req.body.year),
        DOMPurify.sanitize(req.body.price),
        DOMPurify.sanitize(req.body.km),
        DOMPurify.sanitize(req.body.fuel),
        DOMPurify.sanitize(req.body.gearbox),
        DOMPurify.sanitize(req.body.warrant),
        req.params.id
      ];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("La voiture a été modifiée avec succès.");
      });
    });
}; 