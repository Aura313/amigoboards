import express from 'express';
import * as projectsController from '../controllers/projects.js';
import {tokencheck} from '../services/auth-service.js';

const router = express.Router();

// Define todos router to fetch all the projects
router
  .route('/')
  .get(tokencheck,projectsController.get)
  .post(tokencheck,projectsController.save);

// Define router to perform action on specific items

router
  .route('/:slug/:id')
  .get(tokencheck,projectsController.get)
  .put(tokencheck,projectsController.update)
  .delete(tokencheck,projectsController.remove);

  router
  .route('/userName')
  .post(tokencheck,projectsController.getbyUserName);

export default router;
