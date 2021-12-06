import express from "express";
import * as userController from "../controllers/user-controller.js";
import { tokencheck } from "../services/auth-service.js";
const router = express.Router();

/**
 * Router and Controller Binding
 */
//Route for Registration
router
  .route("/signup")
  .post(userController.validateUser(), userController.createUser);

// Route for logging in the registered user
router.route("/login").post(userController.loginUser);

router.route("/").get(tokencheck, userController.index)
.get(userController.get);

router.route("/:id").put(tokencheck, userController.update);

export default router;
