import userStoryRouter from './user-stories.js';

export default (app) => {
    app.use('/', userStoryRouter);    
}