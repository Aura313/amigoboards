import express from "express";

import * as userController from "../controller/user-controller.js";

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/users").get(userController.index).post(userController.save);

router.route("/users/:id").put(userController.update);

/*** SAMPLE POST METHOD JSON
 {
     "title": "WebDesign Project",
    "description": "Update Project Status",
    "createdDate": "2021-11-10",
    "lastModifiedDate": "2021-11-12"
} 
 */

export default (app) => {
  app.use("/", router);
};
