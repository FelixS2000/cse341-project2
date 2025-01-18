const express = require('express');
const { body, validationResult } = require('express-validator');
const Magazine = require('../models/Magazine');
const router = express.Router();

// GET all magazines
router.get('/', async (req, res) => {
    try {
        const magazines = await Magazine.find();
        res.json(magazines);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new magazine
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('publisher').notEmpty().withMessage('Publisher is required'),
        body('price').isNumeric().withMessage('Price must be a number')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const magazine = new Magazine(req.body);
            await magazine.save();
            res.json(magazine);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
