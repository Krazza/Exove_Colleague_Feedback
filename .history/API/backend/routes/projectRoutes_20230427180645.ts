const express = require("express");
const router = express.Router();
const {
  getItems,
  getAnItem,
  createAnItem,
  updateAnItem,
  deleteAnItem,
} = require("../controllers/projectController");

// Alternative shorthand for routers

router.route("/").get(getItems).post(createAnItem);
router.route("/:id").get(getAnItem).put(updateAnItem).delete(deleteAnItem);

module.exports = router;
