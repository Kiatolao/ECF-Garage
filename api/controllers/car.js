import {db} from '../db.js';

export const addCar =  (req, res) => {
    res.json('du controller');
};
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
export const deleteCar=  (req, res) => {
    res.json('du controller');
}; 
export const updateCar =  (req, res) => {
    res.json('du controller');
}; 