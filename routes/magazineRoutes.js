const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');
const { validateMagazine } = require('../middleware/validate');

router.post('/', validateMagazine, magazineController.createMagazine);
router.get('/', magazineController.getAllMagazines);
router.put('/:id', validateMagazine, magazineController.updateMagazine);
router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;
