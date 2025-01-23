const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer } = require('../middleware/validate');

router.post('/', validateCustomer, customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.put('/:id', validateCustomer, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
