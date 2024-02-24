var express = require("express");
var cookbookControl = require("../controllers/cookbooks.js")

const router = express.Router();

router.get("/", cookbookControl.getCookbooks);
router.post("/", cookbookControl.createCookbook);
router.get("/:id", cookbookControl.getCookbook);
router.delete("/:id", cookbookControl.deleteCookbook);
router.patch("/:id", cookbookControl.updateCookbook);

module.exports=router;
