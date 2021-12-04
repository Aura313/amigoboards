import express from "express";
import * as memberController from "../controllers/member-controller.js";

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/").get(memberController.index).post(memberController.save);
router.route("/:id").put(memberController.update);

/*** SAMPLE POST METHOD JSON
 {
     "title": "WebDesign Project",
    "description": "Update Project Status",
    "createdDate": "2021-11-10",
    "lastModifiedDate": "2021-11-12"
} 
 */
export default router;
