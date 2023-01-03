const AuthorController = require("../controllers/AuthorController");
const authorController = new AuthorController();

const { Router } = require("express");
const router = Router();

router.get("/:id", authorController.getAuthor.bind(authorController));
module.exports = router;
