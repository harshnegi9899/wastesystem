const express = require("express");
const router = express.Router();
const Pickup = require("../models/pickup");
const auth = require("../middleware/middleware");

// Schedule a new pickup
router.post("/", auth, async (req, res) => {
  const userId = req.user;
  const { wasteType, scheduledDate } = req.body;
  try {
    const newPickup = new Pickup({
      userId,
      wasteType,
      scheduledDate,
      status: "scheduled",
    });
    await newPickup.save();
    res.status(201).json({ message: "Pickup scheduled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule pickup" });
  }
});

// Retrieve user's pickup history
router.get("/", auth, async (req, res) => {
  const { userId } = req.user;
  try {
    console.log(userId);
    const pickups = await Pickup.find({ userId });
    res.json({
      pickups,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve pickup history" });
  }
});

module.exports = router;
