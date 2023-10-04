import { db } from '../db.js';
import jwt from 'jsonwebtoken';

// Récupérer tous les témoignages
export const getTestimonials = (req, res) => {
  const q = 'SELECT * FROM testimonials';
  db.query(q, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(result);
  });
};

// Récupérer un témoignage par son ID
export const getTestimonial = (req, res) => {
  const testimonialId = req.params.id;
  const q = 'SELECT * FROM testimonials WHERE id = ?';
  db.query(q, [testimonialId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(result);
  });
};

// Ajouter un nouveau témoignage
export const addTestimonial = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour ajouter un témoignage.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à ajouter un témoignage.");

    const { user, testimonial, note } = req.body;
    const q = 'INSERT INTO testimonials (user, testimonial, note) VALUES (?, ?, ?)';
    const values = [user, testimonial, note];
    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json('Le témoignage a été ajouté avec succès.');
    });
  });
};

// Mettre à jour un témoignage par son ID
export const updateTestimonial = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour mettre à jour un témoignage.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à mettre à jour un témoignage.");

    const testimonialId = req.params.id;
    const { user, testimonial, note } = req.body;
    const q = 'UPDATE testimonials SET user = ?, testimonial = ?, note = ? WHERE id = ?';
    const values = [user, testimonial, note, testimonialId];
    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json('Le témoignage a été mis à jour avec succès.');
    });
  });
};

// Supprimer un témoignage par son ID
export const deleteTestimonial = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un témoignage.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer un témoignage.");

    const testimonialId = req.params.id;
    const q = 'DELETE FROM testimonials WHERE id = ?';
    db.query(q, [testimonialId], (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json('Le témoignage a été supprimé avec succès.');
    });
  });
};

