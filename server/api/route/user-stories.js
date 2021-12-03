import express from 'express';
import * as userStoryController from "../controller/user-stories.js"

const router = express.Router();

router.route("/userStories")
    .get(userStoryController.index)
    .post(userStoryController.save);

router.route('/userStories/:id')
    .get(userStoryController.get)
    .put(userStoryController.update)
    .delete(userStoryController.remove);

export default router;