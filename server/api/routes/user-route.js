import express from "express";

import * as userController from "../controllers/user-controller.js";

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/").get(userController.index).post(userController.createUser);

router.route("/:id").put(userController.update);


export default router;
