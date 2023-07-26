import {
  getItems,
  getAnItem,
  createAnItem,
  updateAnItem,
  deleteAnItem,
} from "../controllers/projectController";
// Alternative shorthand for routers
const express = require("express");
const router = express.Router();

// GET all items
router
  .route("/")
  .get((req: Request, res: Response) => getItems(req, res, "questions"));

// POST an item
router
  .route("/")
  .post((req: Request, res: Response) => createAnItem(req, res, "questions"));

// GET an item

router
  .route("/:id")
  .get((req: Request, res: Response) => getAnItem(req, res, "questions"));

// PUT (update) an item
router
  .route("/:id")
  .put((req: Request, res: Response) => updateAnItem(req, res, "questions"));

// DELETE an item
router
  .route("/:id")
  .delete((req: Request, res: Response) => deleteAnItem(req, res, "questions"));

module.exports = router;
