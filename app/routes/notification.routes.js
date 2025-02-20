// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/notification", notificationController.getAllNotifications);
router.get("/notification/:id", notificationController.getNotificationById);
router.post("/notification", notificationController.createNotification);
router.put("/notification/:id", notificationController.updateNotification);
router.delete("/notification/:id", notificationController.deleteNotification);

module.exports = router;
