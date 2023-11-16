import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import DOMPurify from 'isomorphic-dompurify';
import dotenv from 'dotenv';

dotenv.config();

//récupération des services
export const getServices = (req, res) => {
    const q = 'SELECT * FROM services';
    db.query(q, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(result);
    });
  };
  
//récupération d'un horaire par son id
export const getService = (req, res) => {
  const serviceId = req.params.id;
  const q = 'SELECT * FROM services WHERE id = ?';
  db.query(q, [serviceId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(result);
  });
};

//ajout d'un service
export const addService = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour ajouter un service.");

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à ajouter un service.");
    // attention desc est un mot réservé en SQL et doit être entouré de backticks
    const q = 'INSERT INTO services (`service`) VALUES (?)';
    const values =
      DOMPurify.sanitize(req.body.service);

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json('Le service a été ajouté avec succès.');
    });
  });
};

//effacer un service
export const deleteService = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un service.");

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer un service.");

    const serviceId = req.params.id;
    const q = 'DELETE FROM services WHERE id = ?';
    db.query(q, [serviceId], (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json('Le service a été supprimé avec succès.');
    });
  });
};