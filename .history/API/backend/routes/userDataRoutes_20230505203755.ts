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

// GET all items
router
  .route("/")
  .get((req: Request, res: Response) => getItems(req, res, "userData"));

// POST an item
router
  .route("/")
  .post((req: Request, res: Response) => createAnItem(req, res, "userData"));

// GET an item

router
  .route("/:id")
  .get((req: Request, res: Response) => getAnItem(req, res, "userData"));

// PUT (update) an item
router
  .route("/:id")
  .put((req: Request, res: Response) => updateAnItem(req, res, "userData"));

// DELETE an item
router
  .route("/:id")
  .delete((req: Request, res: Response) => deleteAnItem(req, res, "userData"));

module.exports = router;
