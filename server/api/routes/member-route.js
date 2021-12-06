import express from "express";
import * as memberController from "../controllers/member-controller.js";
import {tokencheck} from '../services/auth-service.js';

const router = express.Router();

/**
 * Router and Controller Binding
 */

router.route("/").get(tokencheck,memberController.index).post(tokencheck,memberController.save);
router.route("/:id").put(tokencheck,memberController.update);

/*** SAMPLE POST METHOD JSON
 {
     "title": "WebDesign Project",
    "description": "Update Project Status",
    "createdDate": "2021-11-10",
    "lastModifiedDate": "2021-11-12"
} 
 */
export default router;
