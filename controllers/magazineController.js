const Magazine = require('../models/Magazine');

exports.createMagazine = async (req, res) => {
    try {
        const magazine = new Magazine(req.body);
        await magazine.save();
        res.status(201).send(magazine);
    } catch (error) {
        res.status(400).send({ error: 'Server error while creating magazine.' });
    }
};

exports.getAllMagazines = async (req, res) => {
    try {
        const magazines = await Magazine.find();
        res.status(200).send(magazines);
    } catch (error) {
        res.status(500).send({ error: 'Server error while retrieving magazines.' });
    }
};

exports.updateMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!magazine) return res.status(404).send({ error: 'Magazine not found.' });
        res.send(magazine);
    } catch (error) {
        res.status(400).send({ error: 'Server error while updating magazine.' });
    }
};

exports.deleteMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndDelete(req.params.id);
        if (!magazine) return res.status(404).send({ error: 'Magazine not found.' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).send({ error: 'Server error while deleting magazine.' });
    }
};
