import express from "express";
import * as userController from "../controllers/user-controller.js";

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

router.route("/").get(userController.index);

router.route("/:id").put(userController.update);


export default router;
