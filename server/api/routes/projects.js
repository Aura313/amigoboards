import express from 'express';
import * as projectsController from '../controllers/projects.js';

const router = express.Router();

// Define todos router to fetch all the projects
router
  .route('/')
  .get(projectsController.index)
  .post(projectsController.save);

// Define router to perform action on specific items

router
  .route('/:slug/:id')
  .get(projectsController.get)
  .put(projectsController.update)
  .delete(projectsController.remove);

export default router;
