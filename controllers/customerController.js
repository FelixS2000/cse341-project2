const CustomerModel = require('../models/Customer');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, password, subscriptionPlan } = req.body;

        // Validate input
        if (!name || !email || !password || !subscriptionPlan) {
            return res.status(400).send({ error: 'Name, email, password, and subscription plan are required.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = new CustomerModel({ name, email, password: hashedPassword, subscriptionPlan });
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

// New methods for login and logout
exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await CustomerModel.findOne({ email });
        if (!customer) {
            return res.status(401).send({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid email or password.' });
        }

        req.session.user = customer; // Store user in session
        res.status(200).send({ message: 'Login successful', customer });
    } catch (error) {
        res.status(500).send({ error: 'Server error during login: ' + error.message });
    }
};

exports.logoutCustomer = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ error: 'Could not log out.' });
        }
        res.status(200).send({ message: 'Logout successful' });
    });
};
