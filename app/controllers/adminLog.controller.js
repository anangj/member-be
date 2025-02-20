// controllers/adminLogController.js
const AdminLog = require("../models/AdminLog");

exports.getAllAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminLogById = async (req, res) => {
  try {
    const log = await AdminLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "AdminLog not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdminLog = async (req, res) => {
  try {
    const log = new AdminLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdminLog = async (req, res) => {
  try {
    const log = await AdminLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ error: "AdminLog not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdminLog = async (req, res) => {
  try {
    const log = await AdminLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "AdminLog not found" });
    res.json({ message: "AdminLog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
