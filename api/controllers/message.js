import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import DOMPurify from 'isomorphic-dompurify';
import dotenv from 'dotenv';

dotenv.config();

// récupérer tous les messages
export const getMessages = (req, res) => {
  const q = 'SELECT * FROM messages';
  db.query(q, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

//récupérer un message avec son ID
export const getMessage = (req, res) => {
  const q = 'SELECT * FROM messages WHERE id = ?';
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

//supprimer un message avec son ID
export const deleteMessage = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un message.");

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer ce message.");

    const messageId = req.params.id;
    const q = 'DELETE FROM messages WHERE `id` = ?';

    db.query(q, [messageId], (err, data) => {
      if (err) {
        return res.status(500).json('Une erreur s\'est produite lors de la suppression du message.');
      }
      return res.status(200).json('Le message a été supprimé avec succès.');
    });
  });
};

// Méthode pour ajouter un nouveau message
export const addMessage = (req, res) => {

    const date = new Date();
    //formatage de la date
    const dateString = date.toISOString().slice(0, 19).replace('T', ' ');

    const q =
      "INSERT INTO messages (`firstName`, `lastName`, `email`, `phone`, `message`, `object`, `date`) VALUES (?)";

    const values = [
      DOMPurify.sanitize(req.body.firstName),
      DOMPurify.sanitize(req.body.lastName),
      DOMPurify.sanitize(req.body.email),
      DOMPurify.sanitize(req.body.phone),
      DOMPurify.sanitize(req.body.message),
      DOMPurify.sanitize(req.body.object),
      dateString
    ];

  //validation avec le regex
  const userRegex = /^[A-Za-z\s-]+$/;
  const phoneRegex = /^[\d\s\-+]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const objectRegex = /^[a-zA-Z0-9\s-]+$/;
  const messageRegex = /^[A-Za-z0-9\s.,\-!?'’()]+$/;

  if (!userRegex.test(values[0]) || !userRegex.test(values[1])) {
    return res.status(400).json("Le nom ne doit contenir que des lettres, des tirets et des espaces.");
  }

  if (!emailRegex.test(values[2])) {
    return res.status(400).json("Veuillez entrer une adresse e-mail valide.");
  }

  if (!phoneRegex.test(values[3])) {
    return res.status(400).json("Le numéro ne doit contenir que des chiffres, des espaces et des tirets.");
  }

  if (!messageRegex.test(values[4])) {
    return res.status(400).json("Le message contient des caractères non autorisés.");
  }
  
  if (!objectRegex.test(values[5])) {
    return res.status(400).json("L'objet ne doit contenir que des lettres, des chiffres, des espaces et des tirets.");
  }

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Le message a été ajouté avec succès.");
    });
};

