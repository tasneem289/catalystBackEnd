const express = require("express");
const router = express.Router();
const usersController = require("../controller/auth-controller");


const {
  validateUser,
  handleValidationErrors,
} = require("../middleware/userValidationSchema");

router
  .route("/register")
  .post(validateUser, handleValidationErrors, usersController.register);
router.route("/login").post(usersController.login);

router.post('/:id/upload', usersController.uploadImage);
module.exports = router;
