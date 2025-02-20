// routes/memberRoutes.js
const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");

router.get("/member", memberController.getAllMembers);
router.get("/member/:id", memberController.getMemberById);
router.post("/member", memberController.createMember);
router.put("/member/:id", memberController.updateMember);
router.delete("/member/:id", memberController.deleteMember);

module.exports = router;
