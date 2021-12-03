import express from 'express';
import * as userStoryController from "../controllers/user-stories.js"

const router = express.Router();

router.route("/")
    .get(userStoryController.index)
    .post(userStoryController.save);

router.route('/:id')
    .get(userStoryController.get)
    .put(userStoryController.update)
    .delete(userStoryController.remove);

export default router;