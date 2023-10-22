import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import DOMPurify from 'isomorphic-dompurify';

export const getSchedules = (req, res) => {
  const q = 'SELECT * FROM schedules';
  db.query(q, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

export const getSchedule = (req, res) => {
  const q = 'SELECT * FROM schedules WHERE id = ?';
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};


export const updateSchedule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Pas de token trouvé.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Le token n'est pas valide.");

    const q =
      "UPDATE schedules SET `day` = ?, `openingM` = ?, `closingM` = ?, `openingA` = ?, `closingA` = ? WHERE `id` = ?";

      const values = [
        DOMPurify.sanitize(req.body.day),
        DOMPurify.sanitize(req.body.openingM),
        DOMPurify.sanitize(req.body.closingM),
        DOMPurify.sanitize(req.body.openingA),
        DOMPurify.sanitize(req.body.closingA),
        req.params.id
      ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("L'horaire a été modifié avec succès.");
    });
  });
};
