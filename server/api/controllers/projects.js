import * as projectService from "../services/projects.js";
/**
 * Define Controllers for the application
 * @param {*} message
 * @param {*} response
 */

/**
 * Handle errors
 * @param {*} message
 * @param {*} response
 */

const errorHandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

/**
 * Set Success Response
 * @param {*} data
 * @param {*} response
 */

const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

/**
 * Define CRUD controllers for the projects
 * @param {*} request
 * @param {*} response
 */

//Get all the projects
export const index = async (request, response) => {
  try {
    const items = await projectService.search();
    setSuccessResponse(items, response);
  } catch (e) {
    errorHandler(e.message, response);
  }
};

//Create a new project
export const save = async (request, response) => {
  try {
    const item = { ...request.body };
    const newItem = await projectService.create(item);
    setSuccessResponse(
      { message: `New Project added successfully`, newItem },
      response
    );
  } catch (e) {
    errorHandler(e.message, response);
  }
};

//Update an existing project
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const item = {
      ...request.body,
      id,
    };
    const updatedItem = await projectService.update(item);

    setSuccessResponse(
      { message: `Item ${id} updated successfully`, updatedItem },
      response
    );
  } catch (e) {
    errorHandler(e.message, response);
  }
};

//Delete an existing project
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const removeItem = await projectService.remove(id);
    setSuccessResponse(
      { message: `Item ${id} deleted successfully`, removeItem },
      response
    );
  } catch (e) {
    errorHandler(e.message, response);
  }
};

//Get an existing project
export const get = async (request, response) => {
  try {
    const id = request.params.id;

    const item = await projectService.get(id);
    setSuccessResponse(
      item ? item : `No item found, please check the requested id.`,
      response
    );
  } catch (e) {
    errorHandler(e.message, response);
  }
};

//Get an existing project
export const getbyUserName = async (request, response) => {
  try {
    const name = request.body.userName;
    const project = await projectService.search();
    const memberArray = [];
    for (let i = 0; i < project.length; i++) {
      for (let j = 0; j < project[i].members.length; j++) {
        if (project[i].members[j].userName === name) {
          memberArray.push(project[i]);
        }
      }
    }
    const resultArray = {
      owner: project.filter((item) => item.ownerName === name),
      member: memberArray,
    };

    setSuccessResponse(resultArray, response);
  } catch (e) {
    errorHandler(e.message, response);
  }
};
