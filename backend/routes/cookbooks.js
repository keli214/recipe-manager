import express from "express";
import {
  getCookbook,
  createCookbook,
  updateCookbook,
  deleteCookbook,
  getCookbooks,
} from "../controllers/cookbooks.js";

const router = express.Router();

router.get("/", getCookbooks);
router.post("/", createCookbook);
router.get("/:id", getCookbook);
router.delete("/:id", deleteCookbook);
router.patch("/:id", updateCookbook);

export default router;
