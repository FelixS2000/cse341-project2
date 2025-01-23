const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer } = require('../middleware/validate');

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subscriptionPlan:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validateCustomer, customerController.createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 */
router.get('/', customerController.getAllCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subscriptionPlan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer not found
 */
router.put('/:id', validateCustomer, customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
