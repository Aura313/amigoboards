import express from "express";
import * as memberController from "../controller/member-controller.js";

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/members").get(memberController.index).post(memberController.save);
router.route("/members/:id").put(memberController.update);

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
