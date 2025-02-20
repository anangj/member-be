// routes/benefitRoutes.js
const express = require("express");
const router = express.Router();
const benefitController = require("../controllers/benefit.controller");

router.get("/benefit", benefitController.getAllBenefits);
router.get("/benefit/:id", benefitController.getBenefitById);
router.post("/benefit", benefitController.createBenefit);
router.put("/benefit/:id", benefitController.updateBenefit);
router.delete("/benefit/:id", benefitController.deleteBenefit);

module.exports = router;
