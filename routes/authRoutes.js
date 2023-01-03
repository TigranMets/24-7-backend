const AuthController = require("../controllers/AuthController");
const authController = new AuthController();

const { Router } = require("express");
const router = Router();

router.post("/sign-in", authController.signIn.bind(authController));
module.exports = router;
