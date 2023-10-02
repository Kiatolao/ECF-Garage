import { db } from '../db.js';
import jwt from 'jsonwebtoken';

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

export const deleteSchedule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Vous devez être connecté pour supprimer un horaire.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Vous n'êtes pas autorisé à supprimer cet horaire.");

    const scheduleId = req.params.id;
    const q = 'DELETE FROM schedules WHERE `id` = ?';

    db.query(q, [scheduleId], (err, data) => {
      if (err) {
        return res.status(500).json("Une erreur s'est produite lors de la suppression de l'horaire.");
      }
      return res.status(200).json("L'horaire a été supprimé avec succès.");
    });
  });
};

export const addSchedule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Pas de token trouvé.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Le token n'est pas valide.");

    const q =
      "INSERT INTO schedules (`day`, `start_time`, `end_time`) VALUES (?, ?, ?)";

    const values = [req.body.day, req.body.start_time, req.body.end_time];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("L'horaire a été ajouté avec succès.");
    });
  });
};

export const updateSchedule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Pas de token trouvé.");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Le token n'est pas valide.");

    const q =
      "UPDATE schedules SET `day` = ?, `start_time` = ?, `end_time` = ? WHERE `id` = ?";

    const values = [req.body.day, req.body.start_time, req.body.end_time, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("L'horaire a été modifié avec succès.");
    });
  });
};
