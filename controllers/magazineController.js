const Magazine = require('../models/Magazine');

exports.createMagazine = async (req, res) => {
    try {
        const magazine = new Magazine(req.body);
        await magazine.save();
        res.status(201).send(magazine);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllMagazines = async (req, res) => {
    try {
        const magazines = await Magazine.find();
        res.status(200).send(magazines);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!magazine) return res.status(404).send();
        res.send(magazine);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteMagazine = async (req, res) => {
    try {
        const magazine = await Magazine.findByIdAndDelete(req.params.id);
        if (!magazine) return res.status(404).send();
        res.send(magazine);
    } catch (error) {
        res.status(500).send(error);
    }
};