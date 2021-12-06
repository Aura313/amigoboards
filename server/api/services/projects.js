import Projects from '../models/projects.js';

/**
 * Define Services for the application
 * @param {*} params
 * @returns
 */

// Get all items
export const search = (params = {}) => {
  const promise = Projects.find(params).exec();
  return promise;
};

// Create a new project
export const create = (item) => {
  console.log(item, "dqwndqwj")
  const newItem = new Projects(item);
  return newItem.save();
};

// Update an existing project
export const update = (item) => {
  item._id = item.id;
  const promise = Projects.findByIdAndUpdate(item.id, item, {
    new: true,
  }).exec();
  return promise;
};

// Delete an existing project
export const remove = (id) => {
  const promise = Projects.findByIdAndDelete(id).exec();
  return promise;
};

// Fetch an existing project
export const get = (id) => {
  const promise = Projects.findById(id).exec();
  return promise;
};
