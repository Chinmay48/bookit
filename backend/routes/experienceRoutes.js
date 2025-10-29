const express = require("express");
const { getAllExperiences, getExperienceById } = require("../controllers/experienceController");
const router = express.Router();

router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

module.exports = router;
