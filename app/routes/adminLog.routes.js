// routes/adminLogRoutes.js
const express = require("express");
const router = express.Router();
const adminLogController = require("../controllers/adminLog.controller");

router.get("/adminLog", adminLogController.getAllAdminLogs);
router.get("/adminLog/:id", adminLogController.getAdminLogById);
router.post("/adminLog", adminLogController.createAdminLog);
router.put("/adminLog/:id", adminLogController.updateAdminLog);
router.delete("/adminLog/:id", adminLogController.deleteAdminLog);

module.exports = router;
