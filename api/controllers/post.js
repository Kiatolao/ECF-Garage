import {db} from '../db.js';

export const addPost =  (req, res) => {
    res.json('du controller');
};
export const getPosts =  (req, res) => {
    const q = 'SELECT * FROM posts';
    db.query(q, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
};

export const getPost =  (req, res) => {
    const q = 'SELECT * FROM posts WHERE id = ?';
    db.query (q, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
};
export const deletePost =  (req, res) => {
    res.json('du controller');
}; 
export const updatePost =  (req, res) => {
    res.json('du controller');
}; 