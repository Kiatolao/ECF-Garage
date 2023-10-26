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

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Le message a été ajouté avec succès.");
    });
};

