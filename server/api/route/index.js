import userRoute from './user-route.js';

// Fetch routes
export default (app) => {
  app.use('/users', userRoute);
};
