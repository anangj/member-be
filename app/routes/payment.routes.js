// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.get("/payment", paymentController.getAllPayments);
router.get("/payment/:id", paymentController.getPaymentById);
router.post("/payment", paymentController.createPayment);
router.put("/payment/:id", paymentController.updatePayment);
router.delete("/payment/:id", paymentController.deletePayment);

module.exports = router;
