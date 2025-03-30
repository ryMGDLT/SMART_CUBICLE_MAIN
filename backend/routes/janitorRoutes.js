const express = require("express");
const router = express.Router();
const janitorController = require("../controllers/janitorController");

router.get("/", janitorController.getAllJanitors);
router.get("/:id", janitorController.getJanitorById);
router.post("/", janitorController.createJanitor);
router.patch("/:id", janitorController.updateJanitor);
router.put("/:id/schedule/status", janitorController.updateScheduleStatus);
router.delete("/:id", janitorController.deleteJanitor);

module.exports = router;