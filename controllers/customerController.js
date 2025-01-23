const CustomerModel = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, subscriptionPlan } = req.body;

        // Validate input
        if (!name || !email || !subscriptionPlan) {
            return res.status(400).send({ error: 'Name, email, and subscription plan are required.' });
        }

        const customer = new CustomerModel(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send({ error: 'Server error while creating customer: ' + error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: 'Server error while retrieving customers: ' + error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await CustomerModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!customer) return res.status(404).send({ error: 'Customer not found.' });
        res.send(customer);
    } catch (error) {
        res.status(500).send({ error: 'Server error while updating customer: ' + error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;
  
    try {
        const customer = await CustomerModel.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting customer: ' + error.message });
    }
};
