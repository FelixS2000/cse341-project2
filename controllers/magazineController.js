const Magazine = require('../models/Magazine');

exports.createMagazine = async (req, res) => {
    try {
        const magazine = new Magazine(req.body);
        await magazine.save();
        res.status(201).send(magazine);
    } catch (error) {
        res.status(500).send({ error: 'Server error while creating magazine: ' + error.message });
    }
};

exports.getAllMagazines = async (req, res) => {
    try {
        const magazines = await Magazine.find();
        res.status(200).send(magazines);
    } catch (error) {
        res.status(500).send({ error: 'Server error while retrieving magazines: ' + error.message });
    }
};

exports.updateMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!magazine) return res.status(404).send({ error: 'Magazine not found.' });
        res.send(magazine);
    } catch (error) {
        res.status(500).send({ error: 'Server error while updating magazine: ' + error.message });
    }
};

exports.deleteMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndDelete(req.params.id);
        if (!magazine) {
            return res.status(404).json({ error: 'Magazine not found.' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting magazine: ' + error.message });
    }
};
