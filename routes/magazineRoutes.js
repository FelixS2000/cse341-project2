const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');

router.post('/', magazineController.createMagazine);
router.get('/', magazineController.getAllMagazines);
router.put('/:id', magazineController.updateMagazine);
router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;