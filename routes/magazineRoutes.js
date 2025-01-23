const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');
const { validateMagazine } = require('../middleware/validate');

/**
 * @swagger
 * /magazines:
 *   post:
 *     summary: Create a new magazine
 *     tags: [Magazines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publisher:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Magazine created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validateMagazine, magazineController.createMagazine);

/**
 * @swagger
 * /magazines:
 *   get:
 *     summary: Retrieve all magazines
 *     tags: [Magazines]
 *     responses:
 *       200:
 *         description: A list of magazines
 */
router.get('/', magazineController.getAllMagazines);

/**
 * @swagger
 * /magazines/{id}:
 *   put:
 *     summary: Update a magazine by ID
 *     tags: [Magazines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the magazine to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publisher:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Magazine updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Magazine not found
 */
router.put('/:id', validateMagazine, magazineController.updateMagazine);

/**
 * @swagger
 * /magazines/{id}:
 *   delete:
 *     summary: Delete a magazine by ID
 *     tags: [Magazines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the magazine to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Magazine deleted successfully
 *       404:
 *         description: Magazine not found
 */
router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;
