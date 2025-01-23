const validator = require('../helpers/validate');

const validateCustomer = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        email: 'required|email',
        subscriptionPlan: 'required|string',
        joinedDate: 'required|string',
        magazinesSubscribed: 'array'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed: ' + JSON.stringify(err),
                data: err
            });
        } else {
            next();
        }
    });
};

const validateMagazine = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        publisher: 'required|string',
        genre: 'required|string',
        price: 'required|numeric',
        releaseDate: 'required|string',
        availableCopies: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed: ' + JSON.stringify(err),
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    validateCustomer,
    validateMagazine
};
