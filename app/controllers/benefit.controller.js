// controllers/benefitController.js
const Benefit = require("../models/Benefit");

exports.getAllBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find();
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBenefitById = async (req, res) => {
  try {
    const benefit = await Benefit.findById(req.params.id);
    if (!benefit) return res.status(404).json({ error: "Benefit not found" });
    res.json(benefit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBenefit = async (req, res) => {
  try {
    const benefit = new Benefit(req.body);
    await benefit.save();
    res.status(201).json(benefit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!benefit) return res.status(404).json({ error: "Benefit not found" });
    res.json(benefit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findByIdAndDelete(req.params.id);
    if (!benefit) return res.status(404).json({ error: "Benefit not found" });
    res.json({ message: "Benefit deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
