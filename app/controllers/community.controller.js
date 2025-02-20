// controllers/communityController.js
const Community = require("../models/Community");

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ error: "Community not found" });
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCommunity = async (req, res) => {
  try {
    const community = new Community(req.body);
    await community.save();
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!community) return res.status(404).json({ error: "Community not found" });
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) return res.status(404).json({ error: "Community not found" });
    res.json({ message: "Community deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
