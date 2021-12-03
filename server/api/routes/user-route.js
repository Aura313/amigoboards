import express from "express";

import * as userController from "../controllers/user-controller.js";

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/").get(userController.index).post(userController.save);

router.route("/:id").put(userController.update);


export default router;
