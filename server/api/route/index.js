import userRoute from './user-route.js';
import projectsRoute from './projects.js';

// Fetch routes
export default (app) => {
  app.use('/users', userRoute);
  app.use('/projects', projectsRoute);
};
