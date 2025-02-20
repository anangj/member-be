// routes/communityRoutes.js
const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");

router.get("/community", communityController.getAllCommunities);
router.get("/community/:id", communityController.getCommunityById);
router.post("/community", communityController.createCommunity);
router.put("/community/:id", communityController.updateCommunity);
router.delete("/community/:id", communityController.deleteCommunity);

module.exports = router;
