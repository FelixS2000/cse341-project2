const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, subscriptionPlan } = req.body;

        // Validate input
        if (!name || !email || !subscriptionPlan) {
            return res.status(400).send({ error: 'Name, email, and subscription plan are required.' });
        }

        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send({ error: 'Server error while creating customer.' });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: 'Server error while retrieving customers.' });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!customer) return res.status(404).send({ error: 'Customer not found.' });
        res.send(customer);
    } catch (error) {
        res.status(500).send({ error: 'Server error while updating customer.' });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) return res.status(404).send({ error: 'Customer not found.' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).send({ error: 'Server error while deleting customer.' });
    }
};
