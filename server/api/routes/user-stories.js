import express from "express";
import * as userStoryController from "../controllers/user-stories.js";
import { tokencheck } from "../services/auth-service.js";
const router = express.Router();

router
  .route("/")
  .get(tokencheck, userStoryController.index)
  .post(tokencheck, userStoryController.save);

router
  .route("/:id")
  .get(tokencheck, userStoryController.get)
  .put(tokencheck, userStoryController.update)
  .delete(tokencheck, userStoryController.remove);

export default router;
