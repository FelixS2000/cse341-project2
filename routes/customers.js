const express = require('express');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch customers directly from the database
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new customer
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('subscriptionPlan').isIn(['Monthly', 'Annual']).withMessage('Invalid subscription plan')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const customer = new Customer(req.body); // Create a new customer in the database
            await customer.save();
            res.json(customer);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
