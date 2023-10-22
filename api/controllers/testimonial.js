import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import DOMPurify from 'isomorphic-dompurify';

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

// récupérer un témoignage par son ID
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

// ajouter un nouveau témoignage
export const addTestimonial = (req, res) => {

    const q = 'INSERT INTO testimonials (user, testimonial, note, validated) VALUES (?, ?, ?, ?)';
    const values = [
        DOMPurify.sanitize(req.body.user),
        DOMPurify.sanitize(req.body.testimonial),
        req.body.note,
        req.body.validated
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json('Le témoignage a été ajouté avec succès.');
    });
};

// supprimer un témoignage 
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

export const updateTestimonial=  (req, res) => {
  const token = req.cookies.access_token;
if (!token) return res.status(401).json("Pas de token trouvé.");

jwt.verify(token, "jwtkey", (err) => {
 if (err) return res.status(403).json("Le token n'est pas valide.");

 const testimonialId = req.params.id;
 const q = "UPDATE testimonials SET `validated`=? WHERE `id`=?";

 const values = [
  req.body.validated,
  testimonialId
 ];

 db.query(q, values, (err, data) => {
   if (err) return   console.log('User:', req.body.user);
console.log('Testimonial:', req.body.testimonial);
console.log('Note:', req.body.note);

   return res.json("La voiture a été modifiée avec succès.");
 });
});
}; 